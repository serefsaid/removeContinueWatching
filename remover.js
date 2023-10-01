//document.addEventListener('DOMContentLoaded', ()=>{
window.setTimeout(
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

        const initRemoveContents = ()=>{
            let contentsToRemove = getContentsToRemove();
            
            for(let i = 0 ; i<contentsToRemove.length;i++){
                let contentContainer = document.querySelector(`[data-gv2elementvalue="${contentsToRemove[i]}"]`).parentNode.parentNode.parentNode.parentNode;
                contentContainer.remove();
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
        }


        init();
    })
,3000);
//});