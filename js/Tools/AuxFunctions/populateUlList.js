function populateUlList(ulelement, items, selectedIds = []) {
    ulelement.innerHTML = '';

    items.forEach((item) => {
        var listItem = document.createElement("li");
        var anchor = document.createElement("a");

        listItem.className = "dropdown-item d-flex align-items-center gap-2 py-2";
        anchor.setAttribute('data-id', item.id); // Adiciona o ID como um atributo de dados

        // Estilizando o texto dentro do <a> tag
        anchor.style.color = "black";        // Cor preta
        anchor.style.textDecoration = "none"; // Remover linha inferior
        anchor.style.paddingLeft = "5px";    // Padding-left de 5px

        anchor.appendChild(document.createTextNode(item.text));

        listItem.appendChild(anchor);
        ulelement.appendChild(listItem);
    });
}

export default populateUlList;