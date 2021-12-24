async function insertion(){
    const ele = document.querySelectorAll(".bar");
    ele[0].style.background = 'green';
    for(let i = 1; i < ele.length; i++){
        if(hasPressedStop==true){
            return;
        }
        let j = i - 1;
        let key = ele[i].style.height;
        ele[i].style.background = 'blue';

        await delayTime(delay);
        if(hasPressedStop==true){
            return;
        }

        while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){
            if(hasPressedStop==true){
                return;
            }
            ele[j].style.background = 'blue';
            ele[j + 1].style.height = ele[j].style.height;
            j--;

            await delayTime(delay);
            if(hasPressedStop==true){
                return;
            }
            for(let k = i; k >= 0; k--){
                ele[k].style.background = 'green';
            }
        }
        ele[j + 1].style.height = key;
        ele[i].style.background = 'green';
    }
}

const inSortbtn = document.querySelector(".insertionSort");
inSortbtn.addEventListener('click', async function(){
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    const codepart=document.querySelector(".code");
    codepart.style.display='flex';
    
    codepart.innerHTML=`
    <pre>
    <code>
insertionSort(array)
mark first element as sorted
for each unsorted element X
'extract' the element X
for j <- lastSortedIndex down to 0
    if current element j > X
    move sorted element to the right by 1
break loop and insert X here
end insertionSort
 </code>
 </pre>
 
 <div>
 <a href="https://allaboutsorting.blogspot.com/" target="_blank"><button type="button" class="btn btn-outline-success" style="margin-right: 5px;">Explore More...</button></a>
 </div>
 
 `


    await insertion();
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
