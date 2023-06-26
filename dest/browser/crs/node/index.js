import { NetCrs } from '../net_crs.js';
import { IgnitionFilesCrs } from './ignition_files_crs.js';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { readFile } from 'fs/promises';
import createDebug from 'debug';
const debug = createDebug('bb.js:crs');
/**
 * Generic CRS finder utility class.
 */
export class Crs {
    constructor(numPoints, path) {
        this.numPoints = numPoints;
        this.path = path;
    }
    static async new(numPoints) {
        const crs = new Crs(numPoints, './crs');
        await crs.init();
        return crs;
    }
    async init() {
        mkdirSync(this.path, { recursive: true });
        const size = await readFile(this.path + '/size', 'ascii').catch(() => undefined);
        if (size && +size >= this.numPoints) {
            debug(`using cached crs of size: ${size}`);
            return;
        }
        const crs = IgnitionFilesCrs.defaultExists() ? new IgnitionFilesCrs(this.numPoints) : new NetCrs(this.numPoints);
        if (crs instanceof NetCrs) {
            debug(`downloading crs of size: ${this.numPoints}`);
        }
        else {
            debug(`loading igntion file crs of size: ${this.numPoints}`);
        }
        await crs.init();
        writeFileSync(this.path + '/size', this.numPoints.toString());
        writeFileSync(this.path + '/g1.dat', crs.getG1Data());
        writeFileSync(this.path + '/g2.dat', crs.getG2Data());
    }
    /**
     * G1 points data for prover key.
     * @returns The points data.
     */
    getG1Data() {
        return readFileSync(this.path + '/g1.dat');
    }
    /**
     * G2 points data for verification key.
     * @returns The points data.
     */
    getG2Data() {
        return readFileSync(this.path + '/g2.dat');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY3JzL25vZGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDNUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLFdBQVcsTUFBTSxPQUFPLENBQUM7QUFFaEMsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXZDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLEdBQUc7SUFDZCxZQUE0QixTQUFpQixFQUFrQixJQUFZO1FBQS9DLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBa0IsU0FBSSxHQUFKLElBQUksQ0FBUTtJQUFHLENBQUM7SUFFL0UsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBaUI7UUFDaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJO1FBQ1IsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMxQyxNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakYsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQyxLQUFLLENBQUMsNkJBQTZCLElBQUksRUFBRSxDQUFDLENBQUM7WUFDM0MsT0FBTztTQUNSO1FBRUQsTUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakgsSUFBSSxHQUFHLFlBQVksTUFBTSxFQUFFO1lBQ3pCLEtBQUssQ0FBQyw0QkFBNEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDckQ7YUFBTTtZQUNMLEtBQUssQ0FBQyxxQ0FBcUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDOUQ7UUFDRCxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzlELGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUN0RCxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLEVBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVM7UUFDUCxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTO1FBQ1AsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0YifQ==