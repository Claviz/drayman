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