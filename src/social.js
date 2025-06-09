document.addEventListener('DOMContentLoaded', () => {
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title + " #GTA6");

    const twitterShare = document.getElementById('shareTwitter');
    if (twitterShare) {
        twitterShare.href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
    }

    const facebookShare = document.getElementById('shareFacebook');
    if (facebookShare) {
        facebookShare.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    }
}); 