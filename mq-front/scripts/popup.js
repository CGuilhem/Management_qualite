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

// Ajout d'un utilisateur
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
        'Accept': '*/*'
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

// Mise à jour d'un utilisateur
async function updateUser() {
  // Récupérer les valeurs des champs du formulaire
  const firstName = document.querySelector('.popup input[name="firstName"]').value;
  const lastName = document.querySelector('.popup input[name="lastName"]').value;
  const address = document.querySelector('.popup input[name="address"]').value;
  const birthDate = document.querySelector('.popup input[name="birthDate"]').value;
  const zipCode = document.querySelector('.popup input[name="zipCode"]').value;
  const city = document.querySelector('.popup input[name="city"]').value;

  // Récupérer l'ID de l'utilisateur à modifier
  // const userId = ...; // Remplacer ... par la logique pour obtenir l'ID de l'utilisateur

  // Appeler le controller updateUser avec les données du formulaire
  try {
    const response = await fetch(`http://192.168.20.47:8080/api/v1/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        address,
        birthDate,
        zipCode,
        city,
      }),
    });

    if (response.ok) {
      // Mise à jour réussie
      closePopup();
    } else {
      // La mise à jour a échoué
      alert('Erreur lors de la mise à jour de l\'utilisateur');
    }
  } catch (error) {
    // Une erreur s'est produite lors de la requête
    console.error(error);
    alert('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur');
  }
}


function closePopup() {
  document.getElementById('popupContainer').innerHTML = '';
  document.getElementById('popupContainer').classList.remove('show');
}
