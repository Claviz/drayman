
/**
 * # <drayman-youtube-player \/>
 *
 * Youtube player powered by [Angular Material](https://material.angular.io/) library.
 *
 * ## Example of usage
 *
 * ### Auto-play youtube video.
 * ```typescript
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 * 
 *     return () => {
 *         return <div style={{ height: '500px' }}>
 *             <drayman-youtube-player
 *                 videoId="UEzl9JYkH5M"
 *                 playerVars={{ autoplay: 1 }}
 *             />
 *         </div>
 *     }
 * }
 * ```
 */
export interface DraymanYoutubePlayer {
    /**
     * YouTube Video ID to view.
     */
    videoId?: string;
    /**
     * The moment when the player is supposed to start playing
     */
    startSeconds?: number;
    /**
     * The moment when the player is supposed to stop playing
     */
    endSeconds?: number;
    /**
     * Extra parameters used to configure the player. See:
     * https://developers.google.com/youtube/player_parameters.html?playerVersion=HTML5#Parameters
     */
    playerVars?: { [param: string]: any };
}