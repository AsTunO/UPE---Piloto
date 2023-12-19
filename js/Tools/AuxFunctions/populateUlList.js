function populateUlList(ulelement, items, selectedIds = []) {
    ulelement.innerHTML = '';
    items.forEach((item) => {
        var listItem = document.createElement("li");
        var label = document.createElement("label");
        label.className = "dropdown-item d-flex align-items-center gap-2 py-2";

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = item.id;
        checkbox.checked = selectedIds.includes(item.id);
        checkbox.style.marginRight = "5px";

        var anchor = document.createElement("a");
        anchor.style.color = "black";
        anchor.style.textDecoration = "none";
        anchor.style.paddingLeft = "5px";
        anchor.appendChild(document.createTextNode(item.text));

        label.appendChild(checkbox);
        label.appendChild(anchor);
        listItem.appendChild(label);
        ulelement.appendChild(listItem);
    });

    // Função para filtrar os itens da lista com base no texto inserido
    function filterList() {
        const searchText = document.getElementById('searchInput').value.toLowerCase();

        const listItems = ulelement.getElementsByTagName('li');

        for (let i = 0; i < listItems.length; i++) {
            const text = listItems[i].innerText.toLowerCase();
            if (text.includes(searchText)) {
                listItems[i].style.display = 'block';
            } else {
                listItems[i].style.display = 'none';
            }
        }
    }

    // Verifica se o campo de busca já existe antes de criá-lo
    if (!document.getElementById('searchContainer')) {
        const searchInput = document.createElement('input');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('id', 'searchInput');
        searchInput.setAttribute('placeholder', 'Buscar por nome...');
        searchInput.addEventListener('input', filterList);

        const searchContainer = document.createElement('div');
        searchContainer.setAttribute('id', 'searchContainer');
        ulelement.parentNode.insertBefore(searchContainer, ulelement);
        searchContainer.appendChild(searchInput);
    }
}


export default populateUlList;
