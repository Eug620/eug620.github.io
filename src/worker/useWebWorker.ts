import { ref, onUnmounted } from 'vue';

// 创建一个Web Worker实例
const createWorker = (workerScript: Function) => {
  const blob = new Blob(["(" + workerScript.toString() + ")()"], { type: "text/javascript" });
  const url = window.URL.createObjectURL(blob);
  
  return new Worker(url);
};

function useWebWorker(workerScript:Function) {
    
  const worker = ref(createWorker(workerScript));
  const message = ref(null);
  const error = ref(null) as any;

  worker.value.onmessage = (e) => {
    console.log(e);
    
    message.value = e.data;
    error.value = null;
  };

  worker.value.onerror = (e) => {
    message.value = null;
    error.value = e;
  };

  const postMessage = (msg:any) => worker.value.postMessage(msg);

  onUnmounted(() => worker.value.terminate());

  return { postMessage, message, error };
}

export default useWebWorker;
