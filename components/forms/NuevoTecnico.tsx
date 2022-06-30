import { IUsuario } from "@/services/api.models";
import { UsuariosService } from "@/services/usuarios.service";




const NuevoTecnico = () => {
  const getUsuarios = async () => {
    const service = new UsuariosService();
    const respuesta = await service.getAll();
    const data = respuesta.data as IUsuario;
  };
  return (
    <>
      
    </>
  );
};

export default NuevoTecnico;


