/**
 * # <drayman-ngx-graph \/>
 * 
 * Graph powered by [ngx-charts](https://github.com/swimlane/ngx-graph) library.
 *
 * ## Example of usage
 * 
 * ### Simple graph
 *
 * ![](media://drayman-ngx-graph.gif)
 *
 * ```typescript
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 * 
 *     const links = [{
 *         id: 'a',
 *         source: 'first',
 *         target: 'second',
 *         label: 'is parent of'
 *     }, {
 *         id: 'b',
 *         source: 'first',
 *         target: 'third',
 *         label: 'custom label'
 *     }];
 * 
 *     return () => (
 *         <div style={{ height: '300px', width: '300px' }}>
 *             <button
 *                 onClick={async () => {
 *                     links.push({
 *                         id: `new-link-${links.length}`,
 *                         source: 'first',
 *                         target: 'third',
 *                         label: 'new link'
 *                     })
 *                     await forceUpdate();
 *                 }}
 *             >Add link</button>
 *             <drayman-ngx-graph
 *                 showMiniMap
 *                 links={links}
 *                 nodes={[{
 *                     id: 'first',
 *                     label: 'A'
 *                 }, {
 *                     id: 'second',
 *                     label: 'B'
 *                 }, {
 *                     id: 'third',
 *                     label: 'C',
 *                     data: {
 *                         customColor: 'orange'
 *                     }
 *                 }]}
 *             />
 *         </div>
 *     );
 * }
 * ```
 */
export interface DraymanNgxGraph {
    /**
     * List of graph edges.
     */
    links?: any[];
    /**
     * List of graph nodes.
     */
    nodes?: any[];
    /**
     * List of cluster nodes.
     */
    clusters?: any;
    /**
     * Show/hide minimap.
     */
    showMiniMap?: boolean;
    /**
     * Enable dragging nodes.
     */
    draggingEnabled?: boolean;
    /**
     * Center the graph in the viewport when the graph is updated.
     */
    autoCenter?: boolean;
    /**
     * Automatically zoom the graph to fit in the avialable viewport when the graph is updated.
     */
    autoZoom?: boolean;
}
