//Aca deberiamos de importar nuestros controllers
// **** CONTROLLERS ***
//Aca deberiamos de importar nuestros controllers
const getAllClients = require("../controllers/clients/getAllClients.js");
const updateClient = require("../controllers/clients/putClient.js");
const createClient = require("../controllers/clients/createClient.js");
//----------------------------------- HANDLERS GETS -----------------------------------\\
const getClients = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      //Si existe un cliente con ese nombre que devuelva unicamente a ese cliente
      const allClients = await getAllClients();
      const client = allClients.filter((ele) => ele.id === id);
      res.json(client);
      // res.send('hola tengo id')
    } else {
      //Funcion a llamar para traer todos los clientes
      // res.send("Hola soy client");
      const allClients = await getAllClients();
      res.json(allClients);
    }
  } catch (error) {
    res.status(400).json({ error: "Client Not Found" });
  }
};

//----------------------------------- HANDLERS POST -----------------------------------\\
const postClient = async (req, res) => {
  const data = req.body;
  try {
    const response = await createClient(data);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//----------------------------------- HANDLERS PUT -----------------------------------\\
const putClient = async (req, res) => {
  const { id, name, email, phone, vip, enable, salesmanId } = req.body;
  try {
    updateClient({ id, name, email, phone, vip, enable, salesmanId });
    res.status(200).send("Datos actualizados");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getClients,
  postClient,
  putClient,
};
