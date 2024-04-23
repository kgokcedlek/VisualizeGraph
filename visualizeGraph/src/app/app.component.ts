import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeGraphComponent } from "./components/tree-graph/tree-graph.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, TreeGraphComponent]
})
export class AppComponent {
  title = 'visualizeGraph';
}
