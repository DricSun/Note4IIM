import React from "react";
import axios from "axios";
import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Link} from "react-router-dom";
import Note from "../components/push/Note";
import "../styles/Notes.css";

const Notes = () => {
  const [error, setError] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [selectedCursus, setSelectedCursus] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:1337/api/lessons?populate=*")
      .then(({data}) => setLessons(data.data))
      .catch((error) => setError(error));
  }, []);

  const handlePromotionChange = (event) => {
    setSelectedPromotion(event.target.value);
  };

  const handleCursusChange = (event) => {
    setSelectedCursus(event.target.value);
  };

  const filteredLessons = lessons.filter((lesson) => {
    const byPromotion =
      !selectedPromotion ||
      lesson.attributes.Auteur.data.attributes.Promotion === selectedPromotion;
    const byCursus =
      !selectedCursus ||
      lesson.attributes.Auteur.data.attributes.Cursus === selectedCursus;
    return byPromotion && byCursus;
  });

  if (error) {
    return <div>Une erreur s'est produite : {error.message}</div>;
  }

  return (
    <div className="notes wrapper -medium">
      <h1>Page des notes</h1>
      <div className="selectContainer">
        <select value={selectedPromotion} onChange={handlePromotionChange}>
          <option value="">Toutes les promotions</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="A3">A3</option>
          <option value="A4">A4</option>
          <option value="A5">A5</option>
        </select>
        <select value={selectedCursus} onChange={handleCursusChange}>
          <option value="">Tous les cursus</option>
          <option value="Création & Design">Création & Design</option>
          <option value="Développement Web">Développement Web</option>
          <option value="Jeu vidéo">Jeu vidéo</option>
          <option value="Communication Digital">Communication Digital</option>
          <option value="Animation 3D">Animation 3D</option>
        </select>
      </div>
      <div className="card-container">
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson) => (
            lesson.attributes.Nom && lesson.attributes.Nom.trim() !== '' ? (
              /*<div
                key={lesson.attributes.Email}
                className="lessonCard"
              >
                <p className="has-padding is-title">
                  Cours : <b>{lesson.attributes.Nom}</b>
                </p>
                <div className="lessonContent has-padding">
                  <ReactMarkdown children={lesson.attributes.Notes} />
                </div>
                <div className="nameAndButton has-padding is-title">
                  <p>
                    Écrit par :{" "}
                    <b>
                      {lesson.attributes.Auteur.data.attributes.Nom.toUpperCase()}{" "}
                      {lesson.attributes.Auteur.data.attributes.Prenom.charAt(
                        0
                      ).toUpperCase()}
                      {lesson.attributes.Auteur.data.attributes.Prenom.slice(1)} (
                      {lesson.attributes.Auteur.data.attributes.Promotion} -{" "}
                      {lesson.attributes.Auteur.data.attributes.Cursus})
                    </b>
                  </p>
                  <Link to={`/single-note/${lesson.id}`}>Accéder au notes du cours</Link>
                </div>
              </div>*/

              <Note title={lesson.attributes.Nom} auteur={lesson.attributes.Auteur.data.attributes.Nom}
                    description={lesson.attributes.Notes} link={`/single-note/${lesson.id}`}/>
            ) : null
          ))
        ) : (
          <div className="noResult">Aucun résultat trouvé</div>
        )}
      </div>
    </div>
  );
}

export default Notes;