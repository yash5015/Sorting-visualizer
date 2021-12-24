let hasPressedStop = new Boolean(false);

async function bubble() {
    const ele = document.querySelectorAll(".bar");
    for(let i = 0; i < ele.length-1; i++){
        for(let j = 0; j < ele.length-i-1; j++){
            if(hasPressedStop == true){
                return;
            }
            ele[j].style.background = 'cyan';
            ele[j+1].style.background = 'cyan';
            if(parseInt(ele[j].style.height) > parseInt(ele[j+1].style.height)){
                await delayTime(delay);
                swap(ele[j], ele[j+1]);
            }
            ele[j].style.background = '#e43f5a';
            ele[j+1].style.background = '#e43f5a';
        }
        ele[ele.length-1-i].style.background = 'green';
    }
    ele[0].style.background = 'green';
}

const bubSortbtn = document.querySelector(".bubbleSort");
bubSortbtn.addEventListener('click', async function(){
    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    console.log('bubblesort')


    const codepart=document.querySelector(".code");
    codepart.style.display='flex';
    codepart.innerHTML=`
    <pre>
    <code>
begin BubbleSort(list)

for all elements of list
    if list[i] > list[i+1]
        swap(list[i], list[i+1])
    end if
end for

return list
    
 end BubbleSort
 </code>
 </pre>
 
 <div>
 <a href="https://allaboutsorting.blogspot.com/" target="_blank"><button type="button" class="btn btn-outline-success" style="margin-right: 5px;">Explore More...</button></a>
 </div>

 `
 ;

    await bubble();
    if(hasPressedStop==true){
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    codepart.innerHTML='';
    disableStopSortingBtn();
    

});
