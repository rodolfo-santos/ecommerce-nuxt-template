export default interface Produto {
    id?: string;
    nome?: string;
    preco?: number;
    descricao_breve?: string;
    descricao_completa?: string;
    estoque?: number;
    fotos?: string[];
    categorias?: string[];
    variacoes?: string[];
    peso_kg?: number;
    altura_cm?: number;
    largura_cm?: number;
    comprimento_cm?: number;
    promocao?: boolean;
    preco_promocao?: number;
    publicado?: boolean;
}

