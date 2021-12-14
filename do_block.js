const get_block_list = () => {
    const blockList = localStorage.getItem("active_block_data")
    if (!blockList) {
        set_block_list([])
        return []
    }
    const blockJSON = JSON.parse(blockList)
    if (!blockJSON['block_list']) {
        set_block_list([])
        return []
    }
    return blockJSON['block_list']
}

const set_block_list = (list) => {
    const final_list = {
        block_list: list,
        member_srl: document.querySelector("input#is_logged"),
        updateTime: 1767225599999
    }
    localStorage.setItem("active_block_data", JSON.stringify(final_list))
    app.bbs_user_block(final_list)
    app.comment_block(final_list)

}

const add_block_list = (...list) => {
    const prevList = get_block_list()
    for (item of list) 
        if (prevList.every(a => a!==item)) prevList.push(Number(item))
    set_block_list(prevList)
}

const remove_block_list = (id) => {    
    const blocked = get_block_list()
    const i = blocked.indexOf(Number(id))
    if (i === -1) return
    blocked.splice(i, 1)
    set_block_list(blocked)
    
}

const is_blocked = (id) => {
    const blocked = get_block_list()
    return blocked.includes(Number(id))
}

const addContextMenu = () => {
    const menuRoot = '#context_menu > div > ul'
    const menuRootElement = document.querySelector(menuRoot)
    const activeBlock = 'active_block_super_rabbit'
    if (document.querySelector(menuRoot + ' > li.' + activeBlock) != null) return 

    const activeBlockElement = document.createElement('li')
    const activeBlockClickElement = document.createElement('a')
    activeBlockClickElement.innerText = '수동차단'
    activeBlockClickElement.style.cursor = 'pointer'
    const activeBlockClass = activeBlockClickElement.classList
    activeBlockClass.add(activeBlock)
    activeBlockClass.add('deco')


    activeBlockElement.appendChild(activeBlockClickElement)
    menuRootElement.appendChild(activeBlockElement)
    const defaultMemberContextMenu = app.getMemberContextMenu
    app.getMemberContextMenu = function (e, t, a, i, n) {
        defaultMemberContextMenu(e, t, a, i, n)
        var r = $(e).parent().find("#context_menu.active")
        r.find(".active_block_super_rabbit").addClass("active")
        r.find(".active_block_super_rabbit").one("click", () => {
            (is_blocked(a) ? remove_block_list : add_block_list)(a)
        })
    }
}


addContextMenu()
set_block_list(get_block_list())
