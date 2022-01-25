import useLanguageChooser from "../helpers/hooks/useLanguageChooser";

export default class TextClass {
/*Words*/
    persons  = useLanguageChooser('Personen', 'Servings')
    nutrients = useLanguageChooser('Voedingswaarden', 'Nutrients')
    ingredients = useLanguageChooser('Ingrediënten', 'Ingredients')
    instructions = useLanguageChooser('Bereidingswijze', 'Instructions')
    loading = useLanguageChooser('Laden...', 'Loading...')
    welcome = useLanguageChooser('Welkom', 'Welcome')
    change = useLanguageChooser('Wijzigen', 'Change')
    new = useLanguageChooser('Nieuw:', 'New:')
    old = useLanguageChooser('Oud:', 'Old:')
    repeat = useLanguageChooser('Herhaald:', 'Repeat:')
    dark = useLanguageChooser('Donker', 'Dark')
    light = useLanguageChooser('Licht', 'Light')
    username = useLanguageChooser('Gebruikersnaam:', 'Username:')
    password = useLanguageChooser('Wachtwoord:', 'Password:')
    grocery = useLanguageChooser('Boodschappenlijst', 'Grocery list')
    profile = useLanguageChooser('Profiel', 'Profile')
    success = useLanguageChooser('Gelukt!', 'Success')
    fridge = useLanguageChooser('Koelkast', 'Fridge')
    register = useLanguageChooser('Registreer', 'Register')
    recipe = useLanguageChooser('Recepten', 'Recipes')
    search = useLanguageChooser('Zoeken', 'Search')
    remove = useLanguageChooser('Verwijder','Remove')
    minutes = useLanguageChooser('Minuten','Minutes')
    refresh = useLanguageChooser('Refresh','Refresh')
    email = useLanguageChooser('Email', 'Email')

/*Sentences*/
    daily = useLanguageChooser('Van dagelijkse behoefte', 'Of daily need')
    searchIngredients = useLanguageChooser('Voer ingrediënten in', 'Search ingredients')
    manual = useLanguageChooser('Gebruiksaanwijzing', 'Manual')
    returnHome = useLanguageChooser('Terug naar Home', 'Return to Home')

    /*Fetching*/
    noRecipe = useLanguageChooser('Er kan geen recept gevonden worden.', 'No recipe could be found.')
    getDataError = useLanguageChooser("Recept ophalen mislukt', 'Couldn't fetch recipe")
    noInstructions = useLanguageChooser('Geen instructies beschikbaar.', 'No instructions available.')
    noIngredients = useLanguageChooser('Geen ingrediënten gevonden.', 'No ingredients available.')
    noNutrients = useLanguageChooser('Geen voedingswaarden gevonden.', 'No nutrients available.')
    errorIngredients = useLanguageChooser('Kan geen recept opgehaald worden.', 'Recipes cant be fetched.')
    productError = useLanguageChooser('Producten kunnen niet opgehaald worden', "Products can't be fetched")

    /*Forms*/

    required = useLanguageChooser('Moet ingevoerd worden', 'Must be filled in')
    emailMessage = useLanguageChooser('Voer een juist email-adres in', 'Email address is not correct')
    changeEmail = useLanguageChooser('Email wijzigen:', 'Change email:')
    changePassword = useLanguageChooser('Wijzig wachtwoord:', 'Change password:')
    passwordMessage = useLanguageChooser('Moet minimaal 1 hoofdletter, cijfer en 8 characters bevatten', 'Must contain 1 capital letter, number and 8 characters')
    passwordMatch = useLanguageChooser('Wachtwoord is niet gelijk', 'The passwords do not match')
    wrongPassword = useLanguageChooser('Wachtwoord is verkeerd', 'Wrong password')

    /*Failed*/
    failedOldPassword = useLanguageChooser('Oude wachtwoord incorrect', 'Old password incorrect')
    failedSamePassword = useLanguageChooser('Wachtwoorden zijn hetzelfde', 'Passwords are the same')
    failedUsername = useLanguageChooser('Gebruiker bestaat al', 'User already exists')
    failedEmail = useLanguageChooser('Email al in gebruik', 'Email already in use')
    failedUnknown = useLanguageChooser('Er is een fout opgetreden', 'An error has occurred')
    failedUpdatePassword = useLanguageChooser('Kan wachtwoord niet updaten', "Can't update password")

    /*Pages*/
    notFound = useLanguageChooser('404 - Pagina niet gevonden', '404 - Page not found')
    homepage = useLanguageChooser('Verspil me niet!', 'Dont waste me!')


};