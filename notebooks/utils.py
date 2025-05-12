import numpy as np
import matplotlib.pyplot as plt
from sklearn.manifold import TSNE
from pathlib import Path
import matplotlib.patches as mpatches
from collections import Counter
from IPython.display import display, Markdown
import warnings

warnings.simplefilter("ignore")


def display_citation(text):
    citation = "\n".join(f"> {line}" for line in text.split("\n"))
    display(Markdown(citation))


def display_nodes(nodes, display_text: bool = True, max_chars: int = -1):
    for node in nodes:
        print(f"Result {str(node.node_id)}\n")
        print(f"Score: {node.score}")
        print(
            f"Start char idx: {node.dict()['node']['start_char_idx']}; End char idx: {node.dict()['node']['end_char_idx']}"
        )
        if display_text:
            display_citation(node.text[:max_chars])
        print('-' * 50)