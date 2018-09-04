import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Component, OnInit, ElementRef, ViewEncapsulation, Input, OnChanges } from '@angular/core';
declare var d3

@Component({
  selector: 'app-forcegraph',
  templateUrl: './forcegraph.component.html',
  styleUrls: ['./forcegraph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ForcegraphComponent implements OnInit, OnChanges {

  @Input()
  graph: Object;
  @Input()
  width: number;
  @Input()
  height: number;

  constructor(private el: ElementRef, private http: Http) {
    this.graph = {};
    this.width = 200;
    this.height = 200;
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.graph['nodes'] !== undefined && this.graph['nodes'].length > 0) {
      this.drawGraph();
    }
  }

  drawGraph() {

    let svg = d3.select(this.el.nativeElement).select('svg'),
      width = +svg.attr('width'),
      height = +svg.attr('height')
      ;

    function zoomed() {
      svg.attr("transform", d3.event.transform);
    }
    var zoom = d3.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

    svg.call(zoom);
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    var simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(function (d) { return d.id; }))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));



    var link = svg.select('g.links')
      .selectAll('line')
      .data(this.graph['links'])
      .enter().append('line')
      .attr('stroke-width', function (d) { return Math.sqrt(d.value); });
    link.exit().remove()

    var node = svg.select('g.nodes')
      .selectAll('circle')
      .data(this.graph['nodes'])
      .enter().append('circle')
      .attr('fill', function (d) {
        return color(d.group);
      }).attr('r', valueToSize)
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    node.exit().remove();

    var label = svg.select('g.labels')
    .selectAll('text')
    .data(this.graph['nodes'])
    .enter().append('text')
    .text(function (d) { return d.id; })
    .attr('style', (d) => {return 'font: italic ' +  valueToSize(d).toString() + 'px sans-serif';})
    .on('mouseover', hoveron)
    .on('mouseout', hoveroff)
    .call(d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended));
    node.exit().remove();

    node.append('title')
      .text(function (d) { return d.id; });

    simulation
      .nodes(this.graph['nodes'])
      .on('tick', ticked);

    simulation.force('link')
      .links(this.graph['links']);

    simulation.alphaTarget(0.3).restart()
    function ticked() {
      link
        .attr('x1', function (d) {
          return d.source.x;
        })
        .attr('y1', function (d) { return d.source.y; })
        .attr('x2', function (d) { return d.target.x; })
        .attr('y2', function (d) { return d.target.y; });

      node
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
      label
        .attr('x', function (d) { return d.x; })
        .attr('y', function (d) { return d.y; });
    }

    function valueToSize (d) {
      return 10 / (1 + Math.pow(Math.E, -1 * (d.value - 1)));
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }


    function hoveron(d) {
      d3.select(this).attr('style', () => {return 'font: italic ' +  valueToSize(10).toString() + 'px sans-serif';});
    }

    function hoveroff(d) {
      d3.select(this).attr('style', (d) => {return 'font: italic ' +  valueToSize(d).toString() + 'px sans-serif';});
    }
  }

}
