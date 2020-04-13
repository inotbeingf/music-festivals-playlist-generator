"use strict";
const SpotifyWebApi = require("spotify-web-api-node");

/*
 *   <communicating with Spotify API>
 *                using
 *        spotify-web-api-node
 */

/**
 * Create a playlist for a user including the top tracks from each artist playing at a choosen music festival
 * @param Object with the following properties
 * @property `tracksPerArtist: number` - Number of top tracks per artist to be added to the playlist - max 10
 * @property `artists: array<string>` - Artists playing at choosen festival
 * @property `festival: string` -  Music festival name
 * @property `accessToken: string` -  Users' Spotify Access Token
 * @returns A promise that if successful resolves to an array with the playlist URL at index 0 and subsequent indexes have object responses from Spotify "Add Tracks to a Playlist" endpoint
 */

async function createPlaylist({
  tracksPerArtist,
  artists,
  festival,
  accessToken
}) {
  let spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);

  try {
    /*
     * Get User ID
     *
     * TODO: extract display_name to greet user by the name
     */
    let userProfile = (await spotifyApi.getMe()).body;
    let { id: userID, country } = userProfile; //options: display_name, images, uri

    /*
     * Create a new playlist and get object response
     */
    let playlist = (
      await spotifyApi.createPlaylist(userID, festival, {
        public: true,
        description: "made with ♪ by @fbkz"
      })
    ).body;

    /*
     * Search Artists and get their ID's
     * remove [DJ set] from Artist
     * TODO: return Artists not found
     */
    let artistsIDs = [];
    let artistsNotFound = [];
    for await (let artist of artists) {
      let fixName = RegExp(/\[DJ set\]/g);
      if (fixName.test(artist)) artist = artist.split(fixName)[0].trim();
      let search = (await spotifyApi.searchArtists(artist, { limit: 1 })).body
        .artists;
      if (search.items.length === 0) artistsNotFound.push(artist);
      else {
        let artistID = search.items[0].id;
        artistsIDs.push(artistID);
      }
    }

    /*
     * Search Top Tracks from Artists and get their URIs
     *
     * TODO: look ip/browser user settings for country
     * TODO: have option for mixed or grouped by [Artist, ...]
     */
    let tracksURIs = [];
    for await (let id of artistsIDs) {
      let topTracks = (await spotifyApi.getArtistTopTracks(id, country)).body
        .tracks;
      topTracks.splice(tracksPerArtist);
      for (let track of topTracks) {
        tracksURIs.push(track.uri);
      }
    }

    /*
     * Split tracksURI array into smaller arrays
     * POST add tracks to a playlist - only accepts 100 per request
     * Add each chunck of URIs to the playlist previously created / add each Spotify response to playlistCreated
     */
    let chunk_size = 100;
    let maxNumberURIs = tracksURIs
      .map((uri, i) => {
        return i % chunk_size === 0
          ? tracksURIs.slice(i, i + chunk_size)
          : null;
      })
      .filter(uri => {
        return uri;
      });

    let playlistCreated = [];
    playlistCreated.push(playlist.external_urls.spotify);
    for await (let chuncks of maxNumberURIs) {
      playlistCreated.push(
        spotifyApi.addTracksToPlaylist(playlist.id, chuncks)
      );
    }

    return playlistCreated;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createPlaylist
};
