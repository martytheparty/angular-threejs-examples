import { 
    Service,
    Signal,
    signal,
    WritableSignal
} from '@angular/core';

import * as THREE from 'three';

@Service()
export class ImportService {
    private _groupImport: WritableSignal<THREE.Group[]> = signal<THREE.Group[]>([]);
    public groupImport: Signal<THREE.Group[]> = this._groupImport.asReadonly();

    public setGroupImport(groups: THREE.Group[]): void {
        this._groupImport.set(groups);
    }
}
