(()=>{
    const init = ()=>{
        initRemoveContents();
        createRemoveButtons();
    }
    const getContentsToRemove = ()=>{
        let contentsToRemove = window.localStorage.contentsToRemove; 
        if (!contentsToRemove) {
            contentsToRemove = [];
        } else {
            contentsToRemove = JSON.parse(contentsToRemove);
        }
        return contentsToRemove;
    }
    let tryCount = 0;//to set limit for exceptions (example : there is no continue watching)
    const initRemoveContents = ()=>{
        let contentsToRemove = getContentsToRemove();
        
        let progressBar = document.querySelector('progress');
        
        if(progressBar){
            for(let i = 0 ; i<contentsToRemove.length;i++){
                let contentContainer = document.querySelector(`[data-gv2elementvalue="${contentsToRemove[i]}"]`)?.parentNode.parentNode.parentNode.parentNode;
                if(contentContainer){
                    contentContainer.remove();
                }
            }
        }else if(tryCount<8){
            tryCount++;
            window.setTimeout(initRemoveContents , 3000);
        }
    }
    //data-gv2elementvalue
    const removeFromCW = (button)=>{
        let contentsToRemove = getContentsToRemove();
        let anchor = button.parentNode.parentNode.parentNode;
        let contentId = anchor.getAttribute('data-gv2elementvalue');
        if(contentsToRemove.push(contentId)){
            anchor.parentNode.parentNode.parentNode.parentNode.remove();
            window.localStorage.contentsToRemove = JSON.stringify(contentsToRemove);
        }
    }
    
    const createRemoveButtons = ()=>{
        //let buttonContainers =  Array.prototype.slice.call(document.getElementsByClassName('dlzPWi'));
        let progressBar = document.querySelector('progress');
        if(progressBar){
            let buttonContainers = document.getElementsByClassName('dlzPWi');
            for(let i = 0 ; i<buttonContainers.length;i++){
                const removeButton = document.createElement('button');
                removeButton.classList.add('button','button--circle','button--circle-24','margin--left-4');
                //removeButton.classList.add('margin--left-4');
                removeButton.addEventListener('click',(event)=>{
                    event.stopPropagation();
                    removeFromCW(removeButton);
                });
                const closeIcon = document.createElement('span');
                closeIcon.classList.add('icon','icon--close','icon--size-12');
                removeButton.append(closeIcon);
                buttonContainers[i].appendChild(removeButton);
            }
        }else if(tryCount<8){
            tryCount++;
            window.setTimeout(createRemoveButtons,3000);
        }
    }


    init();
})();