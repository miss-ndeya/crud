class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, className } = this.props;
    return <h1 className={className}>{children}</h1>;
  }
}

class InputLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, value, name, onChange, children } = this.props;
    return (
      <div className=" mx-auto w-100">
        <label className="form-label" htmlFor={name}>
          {children}
        </label>
        <input
          className="form-control "
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    );
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, children, className, onClick } = this.props;
    return (
      <button type={type} onClick={onClick} className={className}>
        {children}
      </button>
    );
  }
}

class Thead extends React.Component {
  render() {
    const { children1, children2, children3, children4, children5 } =
      this.props;
    return (
      <thead>
        <tr className="border">
          <th scope="col"> {children1}</th>
          <th scope="col"> {children2}</th>
          <th scope="col"> {children3}</th>
          <th scope="col"> {children4}</th>
          <th className="text-center fs-6" scope="col">
            {children5}
          </th>
        </tr>
      </thead>
    );
  }
}

class Tbody extends React.Component {
  render() {
    const { utilisateurs, deleteUtilisateur, editUtilisateur } = this.props;
    return (
      <tbody className="fs-6">
        {utilisateurs.map((utilisateur) => (
          <tr key={utilisateur.id}>
            <td>{utilisateur.prenom}</td>
            <td>{utilisateur.nom}</td>
            <td>{utilisateur.email}</td>
            <td>{utilisateur.telephone}</td>
            <td>
              <Button
                className="btn bg-warning "
                children="Modifier"
                onClick={() => editUtilisateur(utilisateur.id)}
              />
            </td>
            <td>
              <Button
                onClick={() => deleteUtilisateur(utilisateur.id)}
                className="btn bg-danger text-white"
                children="Supprimer"
              />
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { utilisateurs, editUtilisateur, deleteUtilisateur } = this.props;
    return (
      <table className="table table-striped table-hover">
        <Thead
          children1="Prenom"
          children2="Nom"
          children3="Email"
          children4="Telephone"
          children5="Action"
        />
        <Tbody
          utilisateurs={utilisateurs}
          editUtilisateur={editUtilisateur}
          deleteUtilisateur={deleteUtilisateur}
        />
      </table>
    );
  }
}

class Crud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      utilisateurs: [],
      modifierId: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    console.log(name, value);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { nom, prenom, email, telephone, modifierId, utilisateurs } =
      this.state;

    if (modifierId !== false) {
      const modifierUtilisateur = utilisateurs.map((utilisateur) =>
        utilisateur.id === modifierId
          ? {
              id: utilisateur.id,
              nom: this.state.nom,
              prenom: this.state.prenom,
              email: this.state.email,
              telephone: this.state.telephone,
            }
          : utilisateur
      );
      this.setState({
        utilisateurs: modifierUtilisateur,
        modifierId: false,
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
      });
    } else {
      const nouveauUtilisateur = {
        id: Math.random(),
        nom: nom,
        prenom: prenom,
        email: email,
        telephone: telephone,
      };
      this.setState((prev) => ({
        utilisateurs: [...prev.utilisateurs, nouveauUtilisateur],
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
      }));
      console.log(this.state);
      console.log(this.state.utilisateurs);
    }
  };

  componentDidMount() {
    const StoredUtilisateurs = JSON.parse(
      localStorage.getItem("utilisateurs") || []
    );
    this.setState({ utilisateurs: StoredUtilisateurs });
  }

  componentDidUpdate() {
    localStorage.setItem(
      "utilisateurs",
      JSON.stringify(this.state.utilisateurs)
    );
  }

  deleteUtilisateur = (id) => {
    this.setState({
      utilisateurs: this.state.utilisateurs.filter(
        (utilisateur) => utilisateur.id !== id
      ),
    });
    console.log(id);
  };

  editUtilisateur = (id) => {
    const utilisateurModifier = this.state.utilisateurs.find(
      (utilisateur) => utilisateur.id === id
    );
    this.setState({
      modifierId: id,
      nom: utilisateurModifier.nom,
      prenom: utilisateurModifier.prenom,
      email: utilisateurModifier.email,
      telephone: utilisateurModifier.telephone,
    });

    console.log(utilisateurModifier);
  };

  render() {
    return (
      <div className="container my-5 d-flex justify-content-center">
        <div className="row">
          <Title
            className="text-center fs-6 mb-3"
            children="Jeemacoder gestion utilisateurs"
          />

          <form
            onSubmit={this.handleSubmit}
            className="shadow col-md-7 mx-auto  p-3 mb-3"
          >
            <div className="mb-3 d-sm-flex  gap-3 mx-auto">
              <InputLabel
                className="me-md-3  "
                id="nom"
                name="nom"
                value={this.state.nom}
                children="Nom"
                onChange={this.handleChange}
                type="text"
              />
              <InputLabel
                className="mx-auto w-100"
                id="prenom"
                name="prenom"
                value={this.state.prenom}
                children="Prenom"
                onChange={this.handleChange}
                type="text"
              />
            </div>

            <div className="mb-3 d-sm-flex gap-3 mx-auto">
              <InputLabel
                className="me-sm-3"
                id="email"
                name="email"
                value={this.state.email}
                children="Email"
                onChange={this.handleChange}
                type="text"
              />
              <InputLabel
                className="me-sm-3"
                id="telephone"
                name="telephone"
                value={this.state.telephone}
                children="Telephone"
                onChange={this.handleChange}
                type="text"
              />
            </div>
            <div className="col-md-12">
              <Button
                type="submit"
                children={this.state.modifierId === false ? "Ajoute" : "Modifier"}
                className={
                  this.state.modifierId === false
                    ? "btn btn-success w-100"
                    : "btn btn-warning w-100"
                }
              ></Button>
            </div>
          </form>
          <div className="col-md-12 mt-4">
            <div className="border-top mt-2 pt-3">
              <Title
                className="text-center mt-3 fs-6"
                children="Utilisateurs"
              />
              <Table
                utilisateurs={this.state.utilisateurs}
                deleteUtilisateur={this.deleteUtilisateur}
                editUtilisateur={this.editUtilisateur}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Crud />, document.getElementById("root"));
