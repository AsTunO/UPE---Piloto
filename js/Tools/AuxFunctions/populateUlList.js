function populateUlList(ulelement, items, selectedIds = []) {
    ulelement.innerHTML = '';

    items.forEach((item) => {
        var listItem = document.createElement("li");
        var label = document.createElement("label"); // Crie um elemento de rótulo para conter a caixa de seleção e o texto
        label.className = "dropdown-item d-flex align-items-center gap-2 py-2";

        var checkbox = document.createElement("input"); // Crie a caixa de seleção
        checkbox.type = "checkbox"; // Defina o tipo como caixa de seleção
        checkbox.value = item.id; // Defina o valor como o ID do item
        checkbox.checked = selectedIds.includes(item.id); // Verifique se o item está selecionado

        // Estilizando a caixa de seleção
        checkbox.style.marginRight = "5px"; // Margem à direita para separar da legenda

        var anchor = document.createElement("a");
        // Estilizando o texto dentro do <a> tag
        anchor.style.color = "black";        // Cor preta
        anchor.style.textDecoration = "none"; // Remover linha inferior
        anchor.style.paddingLeft = "5px";    // Padding-left de 5px

        anchor.appendChild(document.createTextNode(item.text));

        label.appendChild(checkbox);
        label.appendChild(anchor);

        listItem.appendChild(label);
        ulelement.appendChild(listItem);
    });
}

export default populateUlList;
