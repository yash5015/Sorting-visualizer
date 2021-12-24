//TO:DO fix the colors in heapify

async function heapSort(arr, n) {
    // Build heap (rearrange array)
    for (var i = n / 2 - 1; i >= 0; i--) {
        if(hasPressedStop == true){
            return;
        }
        await heapify(arr, n, i);
    }

    // One by one extract an element from heap
    for (var i = n - 1; i > 0; i--) {
        if(hasPressedStop == true){
            return;
        }
        // Move current root to end
        var temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        arr[0].style.background = 'cyan';
        arr[i].style.background = 'green';
        swap(arr[0], arr[i]);
        await delayTime(delay);

        // call max heapify on the reduced heap
        await heapify(arr, i, 0);
    }
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
async function heapify(arr, n, i) {
    if(hasPressedStop == true){
        return;
    }
    var largest = i; // Initialize largest as root
    var l = 2 * i + 1; // left = 2*i + 1
    var r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    
    if (l < n && parseInt(arr[l].style.height) > parseInt(arr[largest].style.height)) {
        // arr[l].style.background = 'lightblue'; 
        // arr[largest].style.background = 'cyan';
        largest = l;
        swap(arr[largest], arr[l]);
        // arr[l].style.background = '#e43f5a';
    }
    

    // If right child is larger than largest so far
    if (r < n && parseInt(arr[r].style.height) > parseInt(arr[largest].style.height)) { 
        // arr[r].style.background = 'lightgreen';
        // arr[largest].style.background = 'cyan'; 
        largest = r;
        swap(arr[largest], arr[r]);
        // arr[l].style.background = '#e43f5a'; 
    }

    // If largest is not root
    if (largest != i) {
        var temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        swap(arr[i], arr[largest]);

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

const heapSortbtn = document.querySelector(".heapSort");
heapSortbtn.addEventListener("click", async function () {
    let arr = document.querySelectorAll('.bar');
    let n = arr.length;

    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    const codepart=document.querySelector(".code");
    codepart.style.display='flex';
    
    codepart.innerHTML=`
    <pre>
    <code>
<b>HeapSort(arr)  </b>

BuildMaxHeap(arr)  
for i = length(arr) to 2  
    swap arr[1] with arr[i]  
        heap_size[arr] = heap_size[arr] ? 1  
        MaxHeapify(arr,1)  
End  

<b>BuildMaxHeap(arr)</b>

BuildMaxHeap(arr)  
    heap_size(arr) = length(arr)  
    for i = length(arr)/2 to 1  
MaxHeapify(arr,i)  
End  

<b>MaxHeapify(arr,i)</b>

MaxHeapify(arr,i)  
L = left(i)  
R = right(i)  
if L ? heap_size[arr] and arr[L] > arr[i]  
largest = L  
else  
largest = i  
if R ? heap_size[arr] and arr[R] > arr[largest]  
largest = R  
if largest != i  
swap arr[i] with arr[largest]  
MaxHeapify(arr,largest)  
End   
 </code>
 </pre>
 
 <div>
 <a href="https://allaboutsorting.blogspot.com/" target="_blank"><button type="button" class="btn btn-outline-success" style="margin-right: 5px;">Explore More...</button></a>
 </div>
 
 `

    await heapSort(arr, n);
    arr[0].style.background = 'green';
    if (hasPressedStop == true) {
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    codepart.innerHTML='';
    disableStopSortingBtn();
});
