import {
  FooterContainer,
  FooterText,
  FooterWrapper,
} from "../styles/components/footer.styles";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterText>
          © {new Date().getFullYear()} Self-ServiceDigital. Todos os direitos reservados.
        </FooterText>
        <FooterText>Orcamento digital sob medida para web, mobile e automacoes.</FooterText>
      </FooterWrapper>
    </FooterContainer>
  );
}
