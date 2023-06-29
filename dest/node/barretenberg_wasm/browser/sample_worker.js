// bug reproduction
// import Worker from 'worker-loader!./sample_worker.js';
self.addEventListener('message', (e) => {
    self.postMessage(`Hello, ${e.data}`);
    // const worker = new Worker();
    // worker.postMessage('Hello');
}, false);
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcGxlX3dvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9iYXJyZXRlbmJlcmdfd2FzbS9icm93c2VyL3NhbXBsZV93b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUJBQW1CO0FBQ25CLHlEQUF5RDtBQUV6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLCtCQUErQjtJQUMvQiwrQkFBK0I7QUFDbkMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDIn0=