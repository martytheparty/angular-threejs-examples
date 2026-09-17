import { Component, effect, inject, TemplateRef, viewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ThreeGroup } from '../../interfaces';
import { SceneService } from '../../services/scene-service';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import * as THREE from 'three';
import { CommonModule } from '@angular/common';
import { ImportService } from '../../services/import-service';
import { ControlsService } from '../../services/controls-service';

@Component({
  selector: 'app-list-manager-component',
  imports: [
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './list-manager-component.html',
  styleUrl: './list-manager-component.scss',
})
export class ListManagerComponent {
  private toJson = viewChild.required<TemplateRef<unknown>>('toJson');
  private fromJson = viewChild.required<TemplateRef<unknown>>('fromJson');

  controlsService: ControlsService = inject(ControlsService);
  sceneService: SceneService = inject(SceneService);
  importService: ImportService = inject(ImportService);

  displayedColumns: string[] = ['name', 'delete'];
  private dialog = inject(MatDialog);

  constructor() {
    effect( () => {
      this.importGroupsFromScene(this.importService.groupImport());
    } );
  }

  importGroupsFromScene(groups: THREE.Group[]): void {
    const threeGroups: ThreeGroup[] = []; 
    groups.forEach(
      (group: THREE.Group) => {
        const newThreeGroup: ThreeGroup = { name: group.userData['name'], group };
        threeGroups.push(newThreeGroup);
      }
    );

    this.controlsService.groups.set(threeGroups);
  }


  addGroup(groupElement: HTMLInputElement): void {
    const groupName = groupElement.value.trim();
    const group = this.sceneService.addDefaultGroup(groupName);
    const newThreeGroup: ThreeGroup ={name: groupName, group}; 
    this.controlsService.groups.set([ ...this.controlsService.groups(), newThreeGroup]);
    this.sceneService.addGroup(newThreeGroup);
    groupElement.value = '';
  }

  deleteGroup(deleteGroup: ThreeGroup): void {
    const objects = this.controlsService.groups();
    const newObjects = objects.filter(
      group => group !== deleteGroup
    );

    this.sceneService.deleteGroup(deleteGroup);

    this.controlsService.groups.set(newObjects);
   }

   selectRow(row: ThreeGroup): void {
    this.sceneService.setSelectedGroup(row);
   }

   importGroup(): void {
    this.dialog.open(this.fromJson());
   }

   exportGroup(exportGroup: ThreeGroup): void {
    const group: THREE.Group = exportGroup.group as THREE.Group;

    const json = JSON.stringify(group.toJSON(), null, 2);

    navigator.clipboard.writeText(json);

    this.dialog.open(this.toJson(), {
      data: {
        json: group.toJSON()
      }
    });
   }

   addGroupFromJson(groupElement: HTMLTextAreaElement): void {
    const json = groupElement.value;

    const loader = new THREE.ObjectLoader();
    const group = loader.parse(JSON.parse(json)) as THREE.Group;
    this.dialog.closeAll();

    const groupName = group.userData['name'];
    this.sceneService.addImportedGroup(group);
    const newThreeGroup: ThreeGroup ={name: groupName, group}; 
    this.controlsService.groups.set([ ...this.controlsService.groups(), newThreeGroup]);
    this.sceneService.addGroup(newThreeGroup);

   }
}
