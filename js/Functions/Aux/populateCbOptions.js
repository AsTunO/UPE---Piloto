function populateCbOptions(cbelement, options, selectedIndex = 0) {
    cbelement.options.length = 0;

    options.forEach((op, index) => {
        var newOption = document.createElement("option");
        newOption.id = op.id;
        newOption.text = op.text;

        if (index == selectedIndex) {
            newOption.setAttribute('selected', 'selected');
        }
        cbelement.add(newOption);
    });
}

export default populateCbOptions