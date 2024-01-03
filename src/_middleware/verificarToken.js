import { JwtToken } from "#security/jwtToken.js";
import { UsuarioService } from "#usuario/service/usuarioService.js";

//TODO REFATORAR
export const verificarToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({msg: "Você não está autenticado."})
        }
        const jwtToken = new JwtToken();
        const usuario = jwtToken.verificarToken(token);
        req.user = await UsuarioService.buscarUsuarioPorId(usuario.id);
        next();
    } catch (error) {
        return res.status(400).json({msg: "Token inválido!"})
    }
}

export const verificarAtivo = async (req, res, next) => {
    await verificarToken(req, res, () => {
        if (req.user.status) {
            next();
        } else {
            return res.status(403).json({msg: "Usuário desativado ou bloqueado!"});
        }
    });
};

export const permissoes = (roles) => {
    return async (req, res, next) => {
        await verificarAtivo(req, res, () => {
            const rolesUser = req.user.roles;
            const validarRole = rolesUser.map((role) => role.nome)
                .some((role) => roles.includes(role));
            if (!validarRole) return res.status(403)
                .json({msg: "Usuário não tem permição para acessar esse recurso!"})
            next();
        });
    }
}

