export type QuoteOptionId =
  | "Aplicação Android"
  | "Site Web"
  | "Sistema (Programa)"
  | "Site e App"
  | "Robo Venda Whatsapp"
  | "Robo Venda Telegram"
  | "Aplicação Power Platform";

export interface QuoteFieldOption {
  label: string;
  value: string;
}

export interface QuoteFeatureOption {
  id: string;
  icon: string;
  label: string;
  description: string;
}

export interface QuoteField {
  id: string;
  label: string;
  type: "text" | "textarea" | "number" | "select";
  placeholder?: string;
  options?: QuoteFieldOption[];
  featureIds?: string[];
}

export interface QuoteFormDefinition {
  title: string;
  description: string;
  fields: QuoteField[];
}

export interface QuoteFollowUpQuestion {
  title: string;
  description: string;
  options: string[];
}

export interface QuoteFeaturesQuestion {
  title: string;
  description: string;
  options: QuoteFeatureOption[];
}

const siteFields: QuoteField[] = [
  {
    id: "site_name",
    label: "Nome do site",
    type: "text",
    placeholder: "Ex: Minha Empresa",
    featureIds: ["identidade"],
  },
  {
    id: "site_theme",
    label: "Tema ou assunto principal",
    type: "text",
    placeholder: "Ex: tecnologia, saude, vendas",
    featureIds: ["identidade"],
  },
  {
    id: "site_objective",
    label: "Objetivo do site",
    type: "select",
    options: [
      { label: "Informativo", value: "informativo" },
      { label: "Institucional", value: "institucional" },
      { label: "E-commerce", value: "ecommerce" },
      { label: "Portal", value: "portal" },
      { label: "Outro", value: "outro" },
    ],
    featureIds: ["paginas"],
  },
  {
    id: "site_pages",
    label: "Quantidade aproximada de paginas",
    type: "number",
    placeholder: "Ex: 5",
    featureIds: ["paginas"],
  },
  {
    id: "site_menu_type",
    label: "Tipo de menu",
    type: "select",
    options: [
      { label: "Hamburguer", value: "hamburguer" },
      { label: "Fixo", value: "fixo" },
      { label: "Oculto", value: "oculto" },
      { label: "Lateral", value: "lateral" },
    ],
    featureIds: ["menu"],
  },
  {
    id: "site_integrations",
    label: "Necessidade de integracao",
    type: "textarea",
    placeholder: "Ex: redes sociais, pagamento online, formularios",
    featureIds: ["integracoes"],
  },
  {
    id: "site_design_preference",
    label: "Preferencia de design",
    type: "select",
    options: [
      { label: "Minimalista", value: "minimalista" },
      { label: "Moderno", value: "moderno" },
      { label: "Classico", value: "classico" },
      { label: "Colorido", value: "colorido" },
    ],
    featureIds: ["design"],
  },
  {
    id: "site_responsive_level",
    label: "Nivel de responsividade desejado",
    type: "select",
    options: [
      { label: "Desktop e mobile", value: "desktop_mobile" },
      { label: "Desktop, tablet e mobile", value: "desktop_tablet_mobile" },
      { label: "Foco em mobile first", value: "mobile_first" },
    ],
    featureIds: ["responsividade"],
  },
  {
    id: "site_graphic_arts",
    label: "Precisa de artes graficas?",
    type: "select",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Nao", value: "nao" },
      { label: "Parcial", value: "parcial" },
    ],
    featureIds: ["artes"],
  },
  {
    id: "site_existing_arts",
    label: "Ja possui artes prontas?",
    type: "select",
    options: [
      { label: "Sim, tudo pronto", value: "sim_tudo" },
      { label: "Tenho parte do material", value: "parcial" },
      { label: "Nao tenho", value: "nao" },
    ],
    featureIds: ["artes"],
  },
  {
    id: "site_seo_priority",
    label: "Nivel de SEO desejado",
    type: "select",
    options: [
      { label: "Basico", value: "basico" },
      { label: "Intermediario", value: "intermediario" },
      { label: "Avancado", value: "avancado" },
    ],
    featureIds: ["seo"],
  },
  {
    id: "site_conversion_goal",
    label: "Objetivo de captacao ou conversao",
    type: "textarea",
    placeholder: "Ex: captar leads, vender, agendar reunioes, receber pedidos",
    featureIds: ["captacao"],
  },
  {
    id: "site_conversion_elements",
    label: "Elementos de conversao desejados",
    type: "textarea",
    placeholder: "Ex: formulario, chatbot, CTA, pop-up, agenda, landing page",
    featureIds: ["captacao"],
  },
  {
    id: "site_admin_panel",
    label: "Precisa de painel administrativo?",
    type: "select",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Nao", value: "nao" },
      { label: "Quero avaliar", value: "avaliar" },
    ],
    featureIds: ["painel"],
  },
  {
    id: "site_admin_functions",
    label: "O que o painel precisa controlar",
    type: "textarea",
    placeholder: "Ex: conteudo, usuarios, pedidos, formularios, blog, banners",
    featureIds: ["painel"],
  },
  {
    id: "site_performance_priority",
    label: "Prioridade de performance",
    type: "select",
    options: [
      { label: "Padrao", value: "padrao" },
      { label: "Alta", value: "alta" },
      { label: "Maxima", value: "maxima" },
    ],
    featureIds: ["performance"],
  },
  {
    id: "site_speed_concerns",
    label: "Existe alguma preocupacao com velocidade ou estabilidade?",
    type: "textarea",
    placeholder: "Ex: site atual lento, trafego alto, carregamento de imagens pesadas",
    featureIds: ["performance"],
  },
];

const androidFields: QuoteField[] = [
  {
    id: "app_name",
    label: "Nome do app",
    type: "text",
    placeholder: "Ex: Meu App",
    featureIds: ["identidade"],
  },
  {
    id: "app_main_function",
    label: "Funcao principal",
    type: "text",
    placeholder: "Ex: vendas, conteudo, utilitario",
    featureIds: ["funcionalidades"],
  },
  {
    id: "app_architecture",
    label: "Precisa ser nativo ou hibrido?",
    type: "select",
    options: [
      { label: "Nativo", value: "nativo" },
      { label: "Hibrido", value: "hibrido" },
      { label: "Preciso de ajuda para decidir", value: "indefinido" },
    ],
    featureIds: ["arquitetura"],
  },
  {
    id: "app_api_integration",
    label: "Integracao com APIs externas?",
    type: "textarea",
    placeholder: "Descreva as APIs ou servicos externos necessarios",
    featureIds: ["integracoes"],
  },
  {
    id: "app_login_types",
    label: "Login de usuarios",
    type: "textarea",
    placeholder: "Ex: Google, Facebook, e-mail",
    featureIds: ["login"],
  },
  {
    id: "app_monetization",
    label: "Monetizacao",
    type: "select",
    options: [
      { label: "Gratuito", value: "gratuito" },
      { label: "Anuncios", value: "anuncios" },
      { label: "Compras in-app", value: "compras_in_app" },
      { label: "Assinatura", value: "assinatura" },
    ],
    featureIds: ["monetizacao"],
  },
  {
    id: "app_push_notifications",
    label: "Precisa de notificacoes push?",
    type: "select",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Nao", value: "nao" },
      { label: "Talvez", value: "talvez" },
    ],
    featureIds: ["notificacoes"],
  },
  {
    id: "app_notification_cases",
    label: "Quando o app deve notificar o usuario",
    type: "textarea",
    placeholder: "Ex: pedidos, mensagens, lembretes, promocoes, status",
    featureIds: ["notificacoes"],
  },
  {
    id: "app_offline_mode",
    label: "Precisa funcionar offline?",
    type: "select",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Nao", value: "nao" },
      { label: "Parcial", value: "parcial" },
    ],
    featureIds: ["offline"],
  },
  {
    id: "app_offline_scope",
    label: "O que precisa funcionar sem internet",
    type: "textarea",
    placeholder: "Ex: consulta de dados, preenchimento, cache, pedidos locais",
    featureIds: ["offline"],
  },
  {
    id: "app_analytics_metrics",
    label: "Metricas e eventos importantes",
    type: "textarea",
    placeholder: "Ex: cadastro, compra, retencao, telas mais acessadas",
    featureIds: ["analytics"],
  },
  {
    id: "app_admin_panel",
    label: "Precisa de painel para administrar o app?",
    type: "select",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Nao", value: "nao" },
      { label: "Quero avaliar", value: "avaliar" },
    ],
    featureIds: ["painel"],
  },
  {
    id: "app_admin_panel_scope",
    label: "O que o painel do app precisa gerenciar",
    type: "textarea",
    placeholder: "Ex: usuarios, conteudo, pedidos, assinaturas, suporte",
    featureIds: ["painel"],
  },
];

const systemFields: QuoteField[] = [
  {
    id: "system_type",
    label: "Tipo de sistema",
    type: "select",
    options: [
      { label: "ERP", value: "erp" },
      { label: "CRM", value: "crm" },
      { label: "Painel administrativo", value: "painel_administrativo" },
      { label: "Software sob medida", value: "software_sob_medida" },
    ],
    featureIds: ["tipo"],
  },
  {
    id: "system_sector",
    label: "Segmento do negocio",
    type: "text",
    placeholder: "Ex: clinica, industria, financeiro, logistica",
    featureIds: ["tipo"],
  },
  {
    id: "concurrent_users",
    label: "Quantidade de usuarios simultaneos",
    type: "number",
    placeholder: "Ex: 10",
    featureIds: ["usuarios"],
  },
  {
    id: "user_profiles",
    label: "Perfis de usuario",
    type: "textarea",
    placeholder: "Ex: administrador, financeiro, comercial, operador",
    featureIds: ["usuarios"],
  },
  {
    id: "main_features",
    label: "Funcionalidades principais",
    type: "textarea",
    placeholder: "Liste os modulos e operacoes mais importantes",
    featureIds: ["funcionalidades"],
  },
  {
    id: "critical_processes",
    label: "Processos que precisam ser automatizados",
    type: "textarea",
    placeholder: "Ex: cadastro, vendas, estoque, aprovacoes, atendimento",
    featureIds: ["funcionalidades"],
  },
  {
    id: "needed_reports",
    label: "Relatorios necessarios",
    type: "textarea",
    placeholder: "Ex: vendas, produtividade, financeiro",
    featureIds: ["relatorios"],
  },
  {
    id: "dashboard_frequency",
    label: "Frequencia de atualizacao dos indicadores",
    type: "select",
    options: [
      { label: "Tempo real", value: "tempo_real" },
      { label: "Diaria", value: "diaria" },
      { label: "Semanal", value: "semanal" },
      { label: "Mensal", value: "mensal" },
    ],
    featureIds: ["relatorios"],
  },
  {
    id: "existing_database_integration",
    label: "Integracao com banco de dados existente?",
    type: "textarea",
    placeholder: "Descreva se ja existe banco, API ou estrutura atual",
    featureIds: ["integracoes"],
  },
  {
    id: "external_integrations",
    label: "Outras integracoes necessarias",
    type: "textarea",
    placeholder: "Ex: ERP legado, API de pagamento, emissao fiscal, CRM",
    featureIds: ["integracoes"],
  },
  {
    id: "roles_permissions",
    label: "Perfis e permissoes necessarias",
    type: "textarea",
    placeholder: "Ex: administrador, gerente, analista, operador com acessos diferentes",
    featureIds: ["permissoes"],
  },
  {
    id: "audit_trail_needed",
    label: "Precisa registrar historico das acoes?",
    type: "select",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Nao", value: "nao" },
      { label: "Quero avaliar", value: "avaliar" },
    ],
    featureIds: ["permissoes"],
  },
  {
    id: "approval_workflows",
    label: "Fluxos de aprovacao ou etapas internas",
    type: "textarea",
    placeholder: "Ex: compra, atendimento, cadastro, financeiro, liberacao de pedidos",
    featureIds: ["workflows"],
  },
  {
    id: "workflow_notifications",
    label: "Como os usuarios devem ser avisados das etapas",
    type: "textarea",
    placeholder: "Ex: email, sistema, push, WhatsApp interno",
    featureIds: ["workflows"],
  },
];

const combinedSiteAppFields: QuoteField[] = [
  {
    id: "combined_business_name",
    label: "Nome do projeto ou empresa",
    type: "text",
    placeholder: "Ex: Minha Empresa",
    featureIds: ["site", "app", "design"],
  },
  {
    id: "combined_site_scope",
    label: "O que o site precisa ter",
    type: "textarea",
    placeholder: "Ex: home, instituicional, landing pages, blog, captacao",
    featureIds: ["site"],
  },
  {
    id: "combined_site_pages",
    label: "Quantidade aproximada de paginas do site",
    type: "number",
    placeholder: "Ex: 6",
    featureIds: ["site"],
  },
  {
    id: "combined_app_scope",
    label: "O que o app precisa fazer",
    type: "textarea",
    placeholder: "Ex: login, area do usuario, pedidos, notificacoes",
    featureIds: ["app"],
  },
  {
    id: "combined_app_platform",
    label: "Plataforma inicial do app",
    type: "select",
    options: [
      { label: "Android", value: "android" },
      { label: "iOS", value: "ios" },
      { label: "Android e iOS", value: "android_ios" },
    ],
    featureIds: ["app"],
  },
  {
    id: "sync_between_site_and_app",
    label: "Como deve funcionar a sincronizacao entre site e app",
    type: "textarea",
    placeholder: "Explique como os dados devem conversar entre as plataformas",
    featureIds: ["sincronizacao"],
  },
  {
    id: "shared_admin_panel",
    label: "Precisa de painel administrativo unificado?",
    type: "select",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Nao", value: "nao" },
      { label: "Quero avaliar", value: "avaliar" },
    ],
    featureIds: ["sincronizacao"],
  },
  {
    id: "combined_visual_direction",
    label: "Direcao visual desejada",
    type: "select",
    options: [
      { label: "Minimalista", value: "minimalista" },
      { label: "Premium", value: "premium" },
      { label: "Moderna", value: "moderna" },
      { label: "Corporativa", value: "corporativa" },
    ],
    featureIds: ["design"],
  },
  {
    id: "brand_assets_status",
    label: "Ja possui identidade visual e materiais?",
    type: "select",
    options: [
      { label: "Sim, tudo pronto", value: "sim_tudo" },
      { label: "Tenho parte do material", value: "parcial" },
      { label: "Nao tenho", value: "nao" },
    ],
    featureIds: ["design"],
  },
  {
    id: "combined_admin_panel",
    label: "Precisa de painel administrativo central?",
    type: "select",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Nao", value: "nao" },
      { label: "Quero avaliar", value: "avaliar" },
    ],
    featureIds: ["painel"],
  },
  {
    id: "combined_admin_scope",
    label: "O que o painel central precisa controlar",
    type: "textarea",
    placeholder: "Ex: usuarios, conteudo, pedidos, relatorios, notificacoes",
    featureIds: ["painel"],
  },
  {
    id: "combined_payment_flow",
    label: "Como devem funcionar os pagamentos",
    type: "textarea",
    placeholder: "Ex: checkout no site, assinatura no app, PIX, cartao, boleto",
    featureIds: ["pagamentos"],
  },
  {
    id: "combined_order_logic",
    label: "Existe compra, assinatura ou agendamento no projeto?",
    type: "textarea",
    placeholder: "Explique o fluxo comercial esperado",
    featureIds: ["pagamentos"],
  },
  {
    id: "combined_notifications",
    label: "Notificacoes necessarias",
    type: "textarea",
    placeholder: "Ex: push no app, email no site, avisos de pedido, lembretes",
    featureIds: ["notificacoes"],
  },
  {
    id: "combined_authentication",
    label: "Como sera o login dos usuarios",
    type: "textarea",
    placeholder: "Ex: email, Google, Apple, redes sociais, area restrita",
    featureIds: ["autenticacao"],
  },
];

const whatsappBotFields: QuoteField[] = [
  {
    id: "automation_type_whatsapp",
    label: "Tipo de automacao",
    type: "select",
    options: [
      { label: "Atendimento", value: "atendimento" },
      { label: "Vendas", value: "vendas" },
      { label: "Funil de leads", value: "funil_de_leads" },
      { label: "Suporte", value: "suporte" },
    ],
    featureIds: ["automacao"],
  },
  {
    id: "whatsapp_main_goal",
    label: "Objetivo principal do robo",
    type: "textarea",
    placeholder: "Ex: captar leads, vender, responder duvidas, qualificar contatos",
    featureIds: ["automacao"],
  },
  {
    id: "auto_message_count_whatsapp",
    label: "Quantidade de mensagens automaticas",
    type: "number",
    placeholder: "Ex: 15",
    featureIds: ["mensagens"],
  },
  {
    id: "message_flow_complexity_whatsapp",
    label: "Como sera o fluxo das mensagens",
    type: "textarea",
    placeholder: "Ex: menu inicial, perguntas frequentes, atendimento humano, follow-up",
    featureIds: ["mensagens"],
  },
  {
    id: "crm_integration_whatsapp",
    label: "Integracao com CRM ou planilhas",
    type: "textarea",
    placeholder: "Ex: HubSpot, Pipedrive, Google Sheets",
    featureIds: ["integracoes"],
  },
  {
    id: "other_integrations_whatsapp",
    label: "Outras integracoes desejadas",
    type: "textarea",
    placeholder: "Ex: ERP, API de pagamento, agenda, webhook, dashboard",
    featureIds: ["integracoes"],
  },
  {
    id: "supported_languages_whatsapp",
    label: "Idiomas suportados",
    type: "text",
    placeholder: "Ex: Portugues, Ingles, Espanhol",
    featureIds: ["idiomas"],
  },
  {
    id: "regional_variants_whatsapp",
    label: "Precisa adaptar linguagem por publico ou regiao?",
    type: "textarea",
    placeholder: "Ex: linguagem comercial, suporte, regionalismos, tom da marca",
    featureIds: ["idiomas"],
  },
  {
    id: "handoff_to_human_whatsapp",
    label: "Quando o atendimento deve ir para humano",
    type: "textarea",
    placeholder: "Ex: orcamento complexo, erro, cliente VIP, duvida sensivel",
    featureIds: ["handoff"],
  },
  {
    id: "human_team_schedule_whatsapp",
    label: "Horario e equipe do atendimento humano",
    type: "textarea",
    placeholder: "Ex: comercial em horario comercial, suporte 24h, fila por setor",
    featureIds: ["handoff"],
  },
  {
    id: "catalog_or_payment_whatsapp",
    label: "Precisa de catalogo, pedido ou pagamento pelo WhatsApp?",
    type: "textarea",
    placeholder: "Ex: listar servicos, enviar pedido, gerar PIX, link de checkout",
    featureIds: ["catalogo"],
  },
  {
    id: "results_tracking_whatsapp",
    label: "Quais resultados precisam ser acompanhados",
    type: "textarea",
    placeholder: "Ex: leads, conversoes, tempo de resposta, funis, abandono",
    featureIds: ["relatorios"],
  },
];

const telegramBotFields: QuoteField[] = [
  {
    id: "automation_type_telegram",
    label: "Tipo de automacao",
    type: "select",
    options: [
      { label: "Atendimento", value: "atendimento" },
      { label: "Vendas", value: "vendas" },
      { label: "Funil de leads", value: "funil_de_leads" },
      { label: "Suporte", value: "suporte" },
    ],
    featureIds: ["automacao"],
  },
  {
    id: "telegram_main_goal",
    label: "Objetivo principal do bot",
    type: "textarea",
    placeholder: "Ex: captacao, onboarding, vendas, comunicados automatizados",
    featureIds: ["automacao"],
  },
  {
    id: "auto_message_count_telegram",
    label: "Quantidade de mensagens automaticas",
    type: "number",
    placeholder: "Ex: 15",
    featureIds: ["mensagens"],
  },
  {
    id: "message_flow_complexity_telegram",
    label: "Como sera o fluxo das mensagens",
    type: "textarea",
    placeholder: "Ex: comandos, menus, sequencias, encaminhamento para humano",
    featureIds: ["mensagens"],
  },
  {
    id: "crm_integration_telegram",
    label: "Integracao com CRM ou planilhas",
    type: "textarea",
    placeholder: "Ex: HubSpot, Pipedrive, Google Sheets",
    featureIds: ["integracoes"],
  },
  {
    id: "other_integrations_telegram",
    label: "Outras integracoes desejadas",
    type: "textarea",
    placeholder: "Ex: ERP, webhook, pagamentos, painel de controle",
    featureIds: ["integracoes"],
  },
  {
    id: "supported_languages_telegram",
    label: "Idiomas suportados",
    type: "text",
    placeholder: "Ex: Portugues, Ingles, Espanhol",
    featureIds: ["idiomas"],
  },
  {
    id: "tone_and_language_telegram",
    label: "Tom de voz e linguagem do bot",
    type: "textarea",
    placeholder: "Ex: tecnico, comercial, amigavel, formal",
    featureIds: ["idiomas"],
  },
  {
    id: "handoff_to_human_telegram",
    label: "Quando o atendimento deve ir para humano",
    type: "textarea",
    placeholder: "Ex: venda consultiva, suporte avancado, erro ou duvida especifica",
    featureIds: ["handoff"],
  },
  {
    id: "human_team_schedule_telegram",
    label: "Horario e equipe do atendimento humano",
    type: "textarea",
    placeholder: "Ex: comercial, suporte, moderacao, fila por assunto",
    featureIds: ["handoff"],
  },
  {
    id: "catalog_or_payment_telegram",
    label: "Precisa de catalogo, pedido ou pagamento no bot?",
    type: "textarea",
    placeholder: "Ex: menu de produtos, carrinho, cobranca, links de pagamento",
    featureIds: ["catalogo"],
  },
  {
    id: "results_tracking_telegram",
    label: "Quais resultados precisam ser acompanhados",
    type: "textarea",
    placeholder: "Ex: vendas, taxa de resposta, comandos usados, conversao",
    featureIds: ["relatorios"],
  },
];

const powerPlatformFields: QuoteField[] = [
  {
    id: "power_platform_flow_type",
    label: "Tipo de fluxo",
    type: "select",
    options: [
      { label: "Automacao", value: "automacao" },
      { label: "App interno", value: "app_interno" },
      { label: "Dashboard", value: "dashboard" },
    ],
    featureIds: ["tipo_fluxo"],
  },
  {
    id: "power_platform_process",
    label: "Processo que deseja resolver",
    type: "textarea",
    placeholder: "Ex: aprovacoes, solicitacoes internas, atendimento, auditoria",
    featureIds: ["tipo_fluxo"],
  },
  {
    id: "microsoft_365_integration",
    label: "Integracao com Microsoft 365",
    type: "textarea",
    placeholder: "Descreva como deve integrar com Outlook, Teams, SharePoint ou Excel",
    featureIds: ["microsoft"],
  },
  {
    id: "microsoft_data_sources",
    label: "Fontes de dados ou conectores necessarios",
    type: "textarea",
    placeholder: "Ex: SharePoint, Dataverse, SQL Server, Excel, Outlook",
    featureIds: ["microsoft"],
  },
  {
    id: "power_platform_users",
    label: "Quantidade de usuarios",
    type: "number",
    placeholder: "Ex: 25",
    featureIds: ["usuarios"],
  },
  {
    id: "power_platform_user_profiles",
    label: "Perfis de acesso",
    type: "textarea",
    placeholder: "Ex: solicitante, aprovador, gestor, administrativo",
    featureIds: ["usuarios"],
  },
  {
    id: "custom_reports_needed",
    label: "Necessidade de relatorios personalizados",
    type: "textarea",
    placeholder: "Explique os relatorios e indicadores importantes",
    featureIds: ["relatorios"],
  },
  {
    id: "report_consumers",
    label: "Quem vai consumir os relatorios",
    type: "textarea",
    placeholder: "Ex: diretoria, operacao, financeiro, comercial",
    featureIds: ["relatorios"],
  },
  {
    id: "approval_stages",
    label: "Fluxos de aprovacao necessarios",
    type: "textarea",
    placeholder: "Ex: compras, solicitacoes internas, RH, financeiro, juridico",
    featureIds: ["aprovacoes"],
  },
  {
    id: "approval_rules",
    label: "Regras ou niveis de aprovacao",
    type: "textarea",
    placeholder: "Ex: aprovacao por valor, area, cargo, centro de custo",
    featureIds: ["aprovacoes"],
  },
  {
    id: "governance_requirements",
    label: "Requisitos de governanca e seguranca",
    type: "textarea",
    placeholder: "Ex: ambientes separados, permissao por perfil, auditoria, DLP",
    featureIds: ["governanca"],
  },
  {
    id: "mobile_usage_power_platform",
    label: "Uso em celular ou tablet",
    type: "textarea",
    placeholder: "Ex: equipes em campo, aprovacao mobile, operacao externa",
    featureIds: ["mobile"],
  },
];

const featureOptionsByType: Record<QuoteOptionId, QuoteFeatureOption[]> = {
  "Site Web": [
    { id: "menu", icon: "📑", label: "Menu", description: "Estrutura de navegacao principal" },
    { id: "responsividade", icon: "📱", label: "Responsividade", description: "Adaptacao completa para mobile" },
    { id: "paginas", icon: "📄", label: "Paginas", description: "Quantidade e estrutura de paginas" },
    { id: "artes", icon: "🎨", label: "Artes graficas", description: "Criacao ou uso de artes visuais" },
    { id: "integracoes", icon: "🔗", label: "Integracoes", description: "Formularios, pagamentos e redes" },
    { id: "design", icon: "✨", label: "Design visual", description: "Direcao visual e estilo do site" },
    { id: "identidade", icon: "🏷️", label: "Identidade do projeto", description: "Nome, tema e conceito do site" },
    { id: "seo", icon: "🔎", label: "SEO", description: "Visibilidade organica e estrutura para busca" },
    { id: "captacao", icon: "🎯", label: "Captação", description: "Leads, formularios, chat e conversao" },
    { id: "painel", icon: "🛠️", label: "Painel", description: "Gerenciamento de conteudo e operacao" },
    { id: "performance", icon: "⚡", label: "Performance", description: "Velocidade, estabilidade e experiencia" },
  ],
  "Aplicação Android": [
    { id: "identidade", icon: "📛", label: "Identidade do app", description: "Nome e conceito do aplicativo" },
    { id: "funcionalidades", icon: "⚙️", label: "Funcionalidades", description: "O que o app precisa fazer" },
    { id: "arquitetura", icon: "🏗️", label: "Arquitetura", description: "Nativo, hibrido ou decisao guiada" },
    { id: "integracoes", icon: "🔌", label: "Integracoes", description: "APIs e servicos externos" },
    { id: "login", icon: "🔐", label: "Login de usuarios", description: "Acesso, perfis e autenticacao" },
    { id: "monetizacao", icon: "💰", label: "Monetizacao", description: "Assinatura, anuncios ou compras" },
    { id: "notificacoes", icon: "🔔", label: "Notificacoes", description: "Push, alertas e comunicacao ativa" },
    { id: "offline", icon: "📶", label: "Modo offline", description: "Uso parcial ou total sem internet" },
    { id: "analytics", icon: "📈", label: "Analytics", description: "Eventos, comportamento e conversao" },
    { id: "painel", icon: "🛠️", label: "Painel", description: "Administracao e operacao do app" },
  ],
  "Sistema (Programa)": [
    { id: "tipo", icon: "🖥️", label: "Tipo de sistema", description: "ERP, CRM ou software sob medida" },
    { id: "usuarios", icon: "👥", label: "Usuarios", description: "Quantidade e escala de uso" },
    { id: "funcionalidades", icon: "🧩", label: "Funcionalidades", description: "Modulos e operacoes principais" },
    { id: "relatorios", icon: "📊", label: "Relatorios", description: "Indicadores e dashboards" },
    { id: "integracoes", icon: "🗄️", label: "Integracoes", description: "Banco existente ou servicos externos" },
    { id: "permissoes", icon: "🛡️", label: "Permissões", description: "Perfis, acessos e trilha de auditoria" },
    { id: "workflows", icon: "🔄", label: "Workflows", description: "Processos, etapas e aprovacoes internas" },
  ],
  "Site e App": [
    { id: "site", icon: "🌐", label: "Frente web", description: "Escopo do site" },
    { id: "app", icon: "📱", label: "Frente mobile", description: "Escopo do aplicativo" },
    { id: "sincronizacao", icon: "🔄", label: "Sincronizacao", description: "Como os dois devem conversar" },
    { id: "design", icon: "🎯", label: "Design unificado", description: "Visual consistente nas plataformas" },
    { id: "painel", icon: "🛠️", label: "Painel central", description: "Gestao unica de operacao e conteudo" },
    { id: "pagamentos", icon: "💳", label: "Pagamentos", description: "Checkout, assinatura e fluxo comercial" },
    { id: "notificacoes", icon: "🔔", label: "Notificacoes", description: "Push, email e alertas da plataforma" },
    { id: "autenticacao", icon: "🔐", label: "Autenticacao", description: "Login, area do usuario e acesso seguro" },
  ],
  "Robo Venda Whatsapp": [
    { id: "automacao", icon: "🤖", label: "Automacao", description: "Fluxos e objetivos do robo" },
    { id: "mensagens", icon: "💬", label: "Mensagens", description: "Quantidade e estrutura de mensagens" },
    { id: "integracoes", icon: "📎", label: "Integracoes", description: "CRM, planilhas e servicos" },
    { id: "idiomas", icon: "🌍", label: "Idiomas", description: "Linguas atendidas pelo robo" },
    { id: "handoff", icon: "🙋", label: "Atendimento humano", description: "Transbordo para equipe comercial ou suporte" },
    { id: "catalogo", icon: "🛒", label: "Catalogo e pedido", description: "Produtos, checkout e fluxo de compra" },
    { id: "relatorios", icon: "📊", label: "Relatorios", description: "Leads, resposta, conversao e operacao" },
  ],
  "Robo Venda Telegram": [
    { id: "automacao", icon: "🤖", label: "Automacao", description: "Fluxos e objetivos do robo" },
    { id: "mensagens", icon: "✉️", label: "Mensagens", description: "Quantidade e estrutura de mensagens" },
    { id: "integracoes", icon: "📎", label: "Integracoes", description: "CRM, planilhas e servicos" },
    { id: "idiomas", icon: "🌍", label: "Idiomas", description: "Linguas atendidas pelo robo" },
    { id: "handoff", icon: "🙋", label: "Atendimento humano", description: "Transbordo para equipe ou moderacao" },
    { id: "catalogo", icon: "🛒", label: "Catalogo e pedido", description: "Produtos, comandos e pagamento no bot" },
    { id: "relatorios", icon: "📊", label: "Relatorios", description: "Uso, conversao e desempenho do bot" },
  ],
  "Aplicação Power Platform": [
    { id: "tipo_fluxo", icon: "⚡", label: "Tipo de fluxo", description: "Automacao, app interno ou dashboard" },
    { id: "microsoft", icon: "🪟", label: "Microsoft 365", description: "Conectores e ecossistema Microsoft" },
    { id: "usuarios", icon: "👤", label: "Usuarios", description: "Escala e perfis de acesso" },
    { id: "relatorios", icon: "📈", label: "Relatorios", description: "Painel e analise personalizada" },
    { id: "aprovacoes", icon: "✅", label: "Aprovacoes", description: "Fluxos internos, regras e etapas" },
    { id: "governanca", icon: "🛡️", label: "Governanca", description: "Seguranca, ambientes e compliance" },
    { id: "mobile", icon: "📲", label: "Uso mobile", description: "Operacao em celular e tablet" },
  ],
};

export const quoteFormSchema = {
  initialQuestion: "Qual tipo de desenvolvimento você quer orçar?",
  options: [
    "Aplicação Android",
    "Site Web",
    "Sistema (Programa)",
    "Site e App",
    "Robo Venda Whatsapp",
    "Robo Venda Telegram",
    "Aplicação Power Platform",
  ] as QuoteOptionId[],
  forms: {
    "Aplicação Android": {
      title: "Orcamento de Aplicacao Android",
      description: "Preencha as informacoes principais do app que voce deseja criar.",
      fields: androidFields,
    },
    "Site Web": {
      title: "Orcamento de Site Web",
      description: "Preencha as informacoes principais do site que voce deseja criar.",
      fields: siteFields,
    },
    "Sistema (Programa)": {
      title: "Orcamento de Sistema",
      description: "Preencha as informacoes principais do sistema que voce deseja desenvolver.",
      fields: systemFields,
    },
    "Site e App": {
      title: "Orcamento de Site e App",
      description: "Preencha as informacoes do site, do app e como ambos devem funcionar juntos.",
      fields: combinedSiteAppFields,
    },
    "Robo Venda Whatsapp": {
      title: "Orcamento de Robo de Venda WhatsApp",
      description: "Preencha como a automacao deve funcionar no WhatsApp.",
      fields: whatsappBotFields,
    },
    "Robo Venda Telegram": {
      title: "Orcamento de Robo de Venda Telegram",
      description: "Preencha como a automacao deve funcionar no Telegram.",
      fields: telegramBotFields,
    },
    "Aplicação Power Platform": {
      title: "Orcamento de Aplicacao Power Platform",
      description: "Preencha as informacoes principais da solucao Power Platform.",
      fields: powerPlatformFields,
    },
  } satisfies Record<QuoteOptionId, QuoteFormDefinition>,
} as const;

export function getFeaturesQuestion(type: QuoteOptionId): QuoteFeaturesQuestion {
  return {
    title: "O que você gostaria que tivesse no projeto?",
    description:
      "Escolha os itens mais importantes para montarmos a proxima etapa com mais detalhes.",
    options: featureOptionsByType[type],
  };
}

export function getDetailFields(
  type: QuoteOptionId,
  selectedFeatures: string[] = [],
): QuoteField[] {
  const fields = quoteFormSchema.forms[type].fields;

  if (selectedFeatures.length === 0) {
    return fields;
  }

  const filteredFields = fields.filter((field) =>
    field.featureIds?.some((featureId) => selectedFeatures.includes(featureId)),
  );

  return filteredFields.length > 0 ? filteredFields : fields;
}

export function getQuoteFieldLabel(
  type: QuoteOptionId,
  fieldId: string,
): string {
  const field = quoteFormSchema.forms[type].fields.find((item) => item.id === fieldId);
  return field?.label ?? fieldId;
}

export function buildFollowUpQuestion(
  type: QuoteOptionId,
  answers: Record<string, string>,
): QuoteFollowUpQuestion {
  switch (type) {
    case "Site Web":
      return {
        title: `Qual prioridade devemos considerar primeiro para o site ${answers.site_name || "do projeto"}?`,
        description:
          "Escolha o foco inicial da proposta para montarmos a primeira etapa do desenvolvimento.",
        options: [
          "Estrutura e paginas principais",
          "Design visual e experiencia",
          "Integracoes e formularios",
          "SEO e performance",
        ],
      };
    case "Aplicação Android":
      return {
        title: `No app ${answers.app_name || "do projeto"}, o que precisa sair primeiro?`,
        description:
          "Essa escolha nos ajuda a priorizar a primeira entrega do aplicativo.",
        options: [
          "Telas e navegacao inicial",
          "Login e area do usuario",
          "Integracoes com APIs",
          "Monetizacao e publicacao",
        ],
      };
    case "Sistema (Programa)":
      return {
        title: "Qual modulo do sistema merece prioridade na primeira versao?",
        description:
          "Defina o foco inicial para organizar a implementacao do sistema por etapas.",
        options: [
          "Cadastro e usuarios",
          "Painel operacional",
          "Relatorios e indicadores",
          "Integracao com base existente",
        ],
      };
    case "Site e App":
      return {
        title: "Qual frente deve ser priorizada primeiro nesse projeto combinado?",
        description:
          "Podemos iniciar pelo canal mais importante e sincronizar a segunda etapa depois.",
        options: [
          "Site primeiro",
          "App primeiro",
          "Sincronizacao entre os dois",
          "Design unificado da plataforma",
        ],
      };
    case "Robo Venda Whatsapp":
      return {
        title: "Qual foco principal do robo de WhatsApp na primeira entrega?",
        description:
          "Escolha a etapa inicial para estruturar o fluxo e as automacoes com mais valor.",
        options: [
          "Atendimento inicial",
          "Qualificacao de leads",
          "Funil de vendas",
          "Integracao com CRM ou planilhas",
        ],
      };
    case "Robo Venda Telegram":
      return {
        title: "Qual foco principal do robo de Telegram na primeira entrega?",
        description:
          "Escolha a etapa inicial para organizar os fluxos e automacoes do bot.",
        options: [
          "Atendimento inicial",
          "Qualificacao de leads",
          "Funil de vendas",
          "Integracao com CRM ou planilhas",
        ],
      };
    case "Aplicação Power Platform":
      return {
        title: "Qual frente da solucao Power Platform deve ser priorizada primeiro?",
        description:
          "Defina o foco inicial para que a proposta seja montada por entrega e impacto.",
        options: [
          "Automacao de processos",
          "Aplicativo interno",
          "Dashboard e indicadores",
          "Integracao com Microsoft 365",
        ],
      };
    default:
      return {
        title: "Qual deve ser a prioridade da primeira entrega?",
        description: "Escolha o foco inicial para montarmos a proposta por etapas.",
        options: ["Estrutura inicial", "Design", "Integracoes", "Relatorios"],
      };
  }
}
