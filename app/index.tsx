import Welcome from '../src/screens/Welcome';
export default function Index() {
  // Plus tard, on vérifiera ici si l'utilisateur est déjà connecté
  // Si oui : return <Redirect href="/(tabs)/home" />;

  return <Welcome />;
}