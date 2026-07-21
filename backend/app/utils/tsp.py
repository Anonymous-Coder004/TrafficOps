from itertools import combinations


def solve_tsp(distance_matrix: list[list[float]]) -> tuple[list[int], float]:
    """
    Solves the Traveling Salesman Problem using
    Held-Karp Dynamic Programming.

    Node 0 is assumed to be the starting location.

    Returns:
        path (node indices)
        total_distance (meters)
    """

    n = len(distance_matrix)

    dp = {}

    for k in range(1, n):
        dp[(1 << k, k)] = (
            distance_matrix[0][k],
            0,
        )

    for subset_size in range(2, n):

        for subset in combinations(range(1, n), subset_size):

            bits = 0

            for bit in subset:
                bits |= 1 << bit

            for k in subset:

                prev_bits = bits & ~(1 << k)

                candidates = []

                for m in subset:

                    if m == k:
                        continue

                    candidates.append(
                        (
                            dp[(prev_bits, m)][0]
                            + distance_matrix[m][k],
                            m,
                        )
                    )

                dp[(bits, k)] = min(candidates)

    bits = (1 << n) - 2

    candidates = []

    for k in range(1, n):

        candidates.append(
            (
                dp[(bits, k)][0]
                + distance_matrix[k][0],
                k,
            )
        )

    opt_cost, parent = min(candidates)

    path = [0]

    last = parent
    mask = bits

    order = []

    while mask:

        order.append(last)

        new_mask = mask & ~(1 << last)

        _, last = dp[(mask, last)]

        mask = new_mask

    path.extend(reversed(order))
    path.append(0)

    return path, opt_cost