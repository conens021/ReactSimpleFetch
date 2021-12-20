function GalleryList({galleryList}) {
    return (
        <section className="movie-list">
            {galleryList.map(g => (
                <div key={g.id} className="movie-single">{g.name}</div>
            ))}
        </section>);
}

export default GalleryList;