import numpy as np

def pagerank(M, num_iterations: int = 100, d: float = 0.85):
    """PageRank: The output is a probability distribution used to represent the likelihood that a person randomly clicking on links will arrive at any particular page."""
    N = M.shape[1]
    v = np.random.rand(N, 1)
    v = v / np.linalg.norm(v, 1)
    M_hat = (d * M + (1 - d) / N)
    for i in range(num_iterations):
        v = M_hat @ v
    return v

# Initialize the adjacency matrix for 8 publications before the key book
# For simplicity, let's assume that each publication references the next one, and the last one references the first.
N = 8
M_pre_1687 = np.zeros((N, N))
for i in range(N-1):
    M_pre_1687[i, i+1] = 1
M_pre_1687[N-1, 0] = 1  # Creating a circular reference pattern

# Normalize by the outlink count per page
for j in range(N):
    sum_of_column = M_pre_1687[:,j].sum()
    if sum_of_column != 0:
        M_pre_1687[:,j] /= sum_of_column

# Compute the PageRank scores for the initial set of publications
pre_1687_scores = pagerank(M_pre_1687)
print(f"PageRank scores before 1687:")
for i, score in enumerate(pre_1687_scores):
    print(f"  Publication {i}: {score[0]:.4f}")

# Now let's add the key book (p8) and subsequent publications (p9 to pX).
# For simplicity, we'll add 10 new publications, all referencing the key book.
new_publications = 10
M_post_1687 = np.zeros((N + 1 + new_publications, N + 1 + new_publications))
M_post_1687[:N, :N] = M_pre_1687

# Key book references all previous publications
M_post_1687[N, :N] = 1

# New publications reference the key book
for i in range(N + 1, N + 1 + new_publications):
    M_post_1687[i, N] = 1

# Normalize by the outlink count per page
for j in range(N + 1 + new_publications):
    sum_of_column = M_post_1687[:,j].sum()
    if sum_of_column != 0:
        M_post_1687[:,j] /= sum_of_column

# Compute the PageRank scores after the release of the key book and new publications
post_1687_scores = pagerank(M_post_1687)
print(f"\nPageRank scores after the release of the key book and new publications:")
for i, score in enumerate(post_1687_scores):
    publication_type = "Key Book" if i == N else "New Publication" if i > N else "Original Publication"
    print(f"  {publication_type} {i}: {score[0]:.4f}")