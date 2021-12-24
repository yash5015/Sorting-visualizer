async function partitionLomuto(ele, l, r){
    let i = l - 1;
    ele[r].style.background = 'cyan'; //pivot
    for(let j = l; j <= r - 1; j++){
        if(hasPressedStop == true){
            return;
        }
        ele[j].style.background = 'yellow'; //current element
        await delayTime(delay);
        if(hasPressedStop == true){
            return;
        }
        if(parseInt(ele[j].style.height) < parseInt(ele[r].style.height)){
            i++;
            swap(ele[i], ele[j]);
            // color 
            ele[i].style.background = 'orange';
            if(i != j) ele[j].style.background = 'orange';
            // pauseChamp
            await delayTime(delay);
        }
        else{
            // color if not less than pivot
            ele[j].style.background = 'pink';
        }
    }
    i++; 
    if(hasPressedStop == true){
        return;
    }
    await delayTime(delay);
    if(hasPressedStop == true){
        return;
    }
    swap(ele[i], ele[r]);
    // color
    ele[r].style.background = 'pink';
    ele[i].style.background = 'green';

    if(hasPressedStop == true){
        return;
    }
    await delayTime(delay);
    if(hasPressedStop == true){
        return;
    }
    
    // color
    for(let k = 0; k < ele.length; k++){
        if(ele[k].style.background != 'green')
            ele[k].style.background = '#e43f5a';
    }

    return i;
}

async function quickSort(ele, l, r){
    if(l < r){
        let pivot_index = await partitionLomuto(ele, l, r);
        await quickSort(ele, l, pivot_index - 1);
        await quickSort(ele, pivot_index + 1, r);
    }
    else{
        if(l >= 0 && r >= 0 && l <ele.length && r <ele.length){
            ele[r].style.background = 'green';
            ele[l].style.background = 'green';
        }
    }
}


const quickSortbtn = document.querySelector(".quickSort");
quickSortbtn.addEventListener('click', async function(){
    let ele = document.querySelectorAll('.bar');
    let l = 0;
    let r = ele.length - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();


    const codepart=document.querySelector(".code");
    codepart.style.display='flex';
    
    codepart.innerHTML=`
    <pre>
    <code>
quickSort(array, leftmostIndex, rightmostIndex)
if (leftmostIndex < rightmostIndex)
    pivotIndex <- partition(array,leftmostIndex, rightmostIndex)
    quickSort(array, leftmostIndex, pivotIndex - 1)
    quickSort(array, pivotIndex, rightmostIndex)

partition(array, leftmostIndex, rightmostIndex)
set rightmostIndex as pivotIndex
storeIndex <- leftmostIndex - 1
for i <- leftmostIndex + 1 to rightmostIndex
if element[i] < pivotElement
    swap element[i] and element[storeIndex]
    storeIndex++
swap pivotElement and element[storeIndex+1]
return storeIndex + 1
    </code>
    </pre>
 
 <div>
 <a href="https://allaboutsorting.blogspot.com/" target="_blank"><button type="button" class="btn btn-outline-success" style="margin-right: 5px;">Explore More...</button></a>
 </div>
 
 `

    await quickSort(ele, l, r);
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
