import { os } from "os";
import cluster from "cluster";

// this stuff should be in the top or first thing that runs when the request is sent to the backend so 
const numCPUs = os.cpus().length;
console.log(numCPUs, "numCPUS")


