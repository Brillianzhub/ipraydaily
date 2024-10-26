function transformGoogleDriveLink(googleDriveLink) {
    // Extract the file ID from the Google Drive link
    const regex = /\/d\/(.*?)\//;
    const match = googleDriveLink.match(regex);
    
    if (match && match[1]) {
        const fileId = match[1];
        // Return the direct download link
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
    } else {
        // Return null if no valid Google Drive link is found
        return null;
    }
}


// Example usage:
const googleDriveLink = "https://docs.google.com/document/d/1RfKwYl27c_0SmkN7I6MaddfZESEQmpmB/edit?usp=drive_link&ouid=101690223152098020505&rtpof=true&sd=true";
const directDownloadLink = transformGoogleDriveLink(googleDriveLink);

if (directDownloadLink) {
    console.log("Direct Download Link:", directDownloadLink);
} else {
    console.log("Invalid Google Drive link");
}



