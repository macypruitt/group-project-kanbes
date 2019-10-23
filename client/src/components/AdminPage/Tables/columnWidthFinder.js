function columnWidthFinder(num) {
    const flexWidth = 100/num;
    const cellStyle = {
        width:`${flexWidth}%`
    }

    return (
       cellStyle
    )
}

export default columnWidthFinder;