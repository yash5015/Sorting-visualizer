async function merge(ele, low, mid, high){
    console.log('In merge()');
    const n1 = mid - low + 1;
    const n2 = high - mid;
    let left = new Array(n1);
    let right = new Array(n2);

    for(let i = 0; i < n1; i++){
        if(hasPressedStop==true){
            return;
        }
        await delayTime(delay);
        ele[low + i].style.background = 'orange';
        left[i] = ele[low + i].style.height;
    }
    for(let i = 0; i < n2; i++){
        if(hasPressedStop==true){
            return;
        }
        await delayTime(delay);
        ele[mid + 1 + i].style.background = 'cyan';
        right[i] = ele[mid + 1 + i].style.height;
    }
    await delayTime(delay);
    let i = 0, j = 0, k = low;
    while(i < n1 && j < n2){
        if(hasPressedStop==true){
            return;
        }
        await delayTime(delay);
        
        if(parseInt(left[i]) <= parseInt(right[j])){
            if((n1 + n2) === ele.length){
                ele[k].style.background = 'green';
            }
            else{
                ele[k].style.background = 'lightgreen';
            }
            
            ele[k].style.height = left[i];
            i++;
            k++;
        }
        else{
            if((n1 + n2) === ele.length){
                ele[k].style.background = 'green';
            }
            else{
                ele[k].style.background = 'lightgreen';
            } 
            ele[k].style.height = right[j];
            j++;
            k++;
        }
    }
    while(i < n1){
        if(hasPressedStop==true){
            return;
        }
        await delayTime(delay);
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'green';
        }
        else{
            ele[k].style.background = 'lightgreen';
        }
        ele[k].style.height = left[i];
        i++;
        k++;
    }
    while(j < n2){
        if(hasPressedStop==true){
            return;
        }
        await delayTime(delay);
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'green';
        }
        else{
            ele[k].style.background = 'lightgreen';
        }
        ele[k].style.height = right[j];
        j++;
        k++;
    }
}

async function mergeSort(ele, l, r){
    if(l >= r){
        //sorting complete
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(ele, l, m);
    await mergeSort(ele, m + 1, r);
    await merge(ele, l, m, r);
}

const mergeSortbtn = document.querySelector(".mergeSort");
mergeSortbtn.addEventListener('click', async function(){
    let ele = document.querySelectorAll('.bar');
    let l = 0;
    let r = parseInt(ele.length) - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    const codepart=document.querySelector(".code");
    codepart.style.display='flex';
    
    codepart.innerHTML=`
    <pre>
    <code>
   
MERGE_SORT(arr, beg, end)  

if beg < end  
set mid = (beg + end)/2  
MERGE_SORT(arr, beg, mid)  
MERGE_SORT(arr, mid + 1, end)  
MERGE (arr, beg, mid, end)  
end of if  
    
END MERGE_SORT  

<b>/* Function to merge the subarrays of a[] */</b>  
void merge(int a[], int beg, int mid, int end)    
{    
    int i, j, k;  
    int n1 = mid - beg + 1;    
    int n2 = end - mid;    
      
    int LeftArray[n1], RightArray[n2]; //temporary arrays  

    /* copy data to temp arrays */  
    
    for (int i = 0; i < n1; i++)    
    LeftArray[i] = a[beg + i];    
    for (int j = 0; j < n2; j++)    
    RightArray[j] = a[mid + 1 + j];    
      
    i = 0, /* initial index of first sub-array */  
    j = 0; /* initial index of second sub-array */   
    k = beg;  /* initial index of merged sub-array */  
      
    while (i < n1 && j < n2)    
    {    
        if(LeftArray[i] <= RightArray[j])    
        {    
            a[k] = LeftArray[i];    
            i++;    
        }    
        else    
        {    
            a[k] = RightArray[j];    
            j++;    
        }    
        k++;    
    }    
    while (i < n1)    
    {    
        a[k] = LeftArray[i];    
        i++;    
        k++;    
    }    
      
    while (j < n2)    
    {    
        a[k] = RightArray[j];    
        j++;    
        k++;    
    }    
}    
 </code>
 </pre>
 
 <div>
 <a href="https://allaboutsorting.blogspot.com/" target="_blank"><button type="button" class="btn btn-outline-success" style="margin-right: 5px;">Explore More...</button></a>
 </div>
 
 `


    await mergeSort(ele, l, r);
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
