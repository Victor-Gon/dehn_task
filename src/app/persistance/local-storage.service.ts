import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'

@Injectable({
    providedIn: 'root'
})
/**
 * Service for saving data in the local storage
 */
export class LocalStorageService {

    private localStorageAvailable: boolean = true;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        if (isPlatformBrowser(this.platformId)) {
            this.localStorageAvailable = true;
        } else {
            this.localStorageAvailable = false;
            console.warn("Local Storage not available. Browser memory will not be saved.")
        }
    }

    /**
     * Saves the given data in the local storage
     * @param key 
     * @param data
     * @returns 
     */
    public saveData(key: string, data: any): void {
        if (!this.localStorageAvailable)
            return;
        let jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
    }

    /**
     * Retrieves data from the local storage
     * @param key 
     * @returns the data or undefined if not found
     */
    public loadData(key: string): any {
        if (!this.localStorageAvailable)
            return undefined;
        try {
            let data = localStorage.getItem(key);
            if (!data)
                return undefined;
            data = JSON.parse(data);
            return data;
        } catch (e) {
            return undefined;
        }
    }

    /**
     * Clears data under the given key from the local storage
     * @param key 
     */
    public clearData(key: string): void {
        if (!this.localStorageAvailable)
            return;
        localStorage.removeItem(key);
    }

    /**
     * Clears all data from the local storage
     */
    public clearAllLocalStorage() {
        if (!this.localStorageAvailable)
            return;
        localStorage.clear();
    }
}
