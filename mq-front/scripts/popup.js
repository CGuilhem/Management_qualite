function openPopup() {
  // Créer une requête XMLHttpRequest pour charger le contenu du fichier popup.html
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '../mq-front/templates/popup.html', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Insérer le contenu de la popup dans le conteneur
      document.getElementById('popupContainer').innerHTML = xhr.responseText;
      // Afficher la popup en modifiant la classe CSS
      document.getElementById('popupContainer').classList.add('show');
    }
  };
  xhr.send();
}

async function validate() {
  const firstName = document.querySelector('.popup input[name="firstName"]').value;
  const lastName = document.querySelector('.popup input[name="lastName"]').value;
  const address = document.querySelector('.popup input[name="address"]').value;
  const birthDate = document.querySelector('.popup input[name="birthDate"]').value;
  const zipCode = document.querySelector('.popup input[name="zipCode"]').value;
  const city = document.querySelector('.popup input[name="city"]').value;

  const newUser = {
    firstName,
    lastName,
    address,
    birthDate,
    zipCode,
    city,
  };

  try {
    const response = await fetch('http://192.168.20.47:8080/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      // La création de l'utilisateur a réussi
      console.log('Utilisateur créé avec succès');
      closePopup(); // Ferme la popup après la création
    } else {
      // La création de l'utilisateur a échoué
      console.log('Erreur lors de la création de l\'utilisateur');
    }
  } catch (error) {
    // Une erreur s'est produite lors de la requête
    console.log('Une erreur s\'est produite lors de la création de l\'utilisateur:', error);
  }
}


function closePopup() {
  document.getElementById('popupContainer').innerHTML = '';
  document.getElementById('popupContainer').classList.remove('show');
}
