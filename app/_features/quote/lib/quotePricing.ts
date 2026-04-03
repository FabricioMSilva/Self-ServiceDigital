import { type QuoteOptionId } from "@/app/_features/quote/lib/quoteFormSchema";

export interface QuoteEstimateItem {
  label: string;
  amount: number;
}

export interface QuoteEstimate {
  title: string;
  marketReference: string;
  items: QuoteEstimateItem[];
  total: number;
}

// Traduz respostas abertas e escolhas do catálogo em uma referência comercial
// inicial. O cálculo é propositalmente heurístico para apoiar a conversa
// comercial, não para substituir levantamento detalhado de requisitos.
function toCurrency(value: number) {
  return Math.max(0, Math.round(value));
}

function parseNumber(value?: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function hasValue(value?: string) {
  return Boolean(value && value.trim().length > 0);
}

function hasAnyValue(answers: Record<string, string>, keys: string[]) {
  return keys.some((key) => hasValue(answers[key]));
}

function countLanguages(value?: string) {
  if (!value) {
    return 0;
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean).length;
}

function siteEstimate(answers: Record<string, string>, secondQuestionAnswer: string | null): QuoteEstimate {
  const pages = Math.max(parseNumber(answers.site_pages), 1);
  const objective = answers.site_objective;
  const menuType = answers.site_menu_type;
  const design = answers.site_design_preference;

  const items: QuoteEstimateItem[] = [
    { label: "Planejamento e arquitetura inicial", amount: 180 },
    { label: "Estrutura base do site", amount: 620 },
    { label: `Paginas estimadas (${pages})`, amount: Math.max(0, pages - 3) * 70 },
  ];

  const objectiveMap: Record<string, number> = {
    informativo: 90,
    institucional: 140,
    ecommerce: 420,
    portal: 260,
    outro: 120,
  };

  const menuMap: Record<string, number> = {
    hamburguer: 20,
    fixo: 30,
    oculto: 40,
    lateral: 60,
  };

  const designMap: Record<string, number> = {
    minimalista: 70,
    moderno: 120,
    classico: 60,
    colorido: 95,
  };

  if (objective) {
    items.push({
      label: "Escopo do objetivo principal",
      amount: objectiveMap[objective] ?? 0,
    });
  }

  if (menuType) {
    items.push({
      label: "Menu e navegacao escolhidos",
      amount: menuMap[menuType] ?? 0,
    });
  }

  if (hasValue(answers.site_integrations)) {
    const integrationText = answers.site_integrations.toLowerCase();
    let integrationValue = 120;
    if (integrationText.includes("pagamento")) {
      integrationValue += 280;
    }
    if (integrationText.includes("rede")) {
      integrationValue += 30;
    }
    if (integrationText.includes("form")) {
      integrationValue += 30;
    }

    items.push({
      label: "Integracoes solicitadas",
      amount: integrationValue,
    });
  }

  if (design) {
    items.push({
      label: "Direcao visual e UX",
      amount: designMap[design] ?? 0,
    });
  }

  if (hasAnyValue(answers, ["site_seo_priority"])) {
    const seoMap: Record<string, number> = {
      basico: 180,
      intermediario: 220,
      avancado: 380,
    };

    items.push({
      label: "Estrutura de SEO",
      amount: seoMap[answers.site_seo_priority] ?? 180,
    });
  }

  if (hasAnyValue(answers, ["site_conversion_goal", "site_conversion_elements"])) {
    items.push({
      label: "Captação e conversao",
      amount: 120,
    });
  }

  if (answers.site_admin_panel === "sim" || hasValue(answers.site_admin_functions)) {
    items.push({
      label: "Painel administrativo",
      amount: 160,
    });
  }

  if (hasAnyValue(answers, ["site_performance_priority", "site_speed_concerns"])) {
    const performanceMap: Record<string, number> = {
      padrao: 0,
      alta: 180,
      maxima: 360,
    };

    items.push({
      label: "Ajustes de performance",
      amount: performanceMap[answers.site_performance_priority] ?? 120,
    });
  }

  if (secondQuestionAnswer) {
    items.push({
      label: `Prioridade da fase 1: ${secondQuestionAnswer}`,
      amount: 90,
    });
  }

  items.push({
    label: "Condição comercial de entrada",
    amount: -120,
  });

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return {
    title: "Pre-orcamento de Site Web",
    marketReference:
      "Valores ilustrativos. Podemos melhorar o preco apos um orcamento pessoal, dependendo do que voce precisa e do material que ja possui, como artes, textos e identidade visual.",
    items: items.map((item) => ({ ...item, amount: toCurrency(item.amount) })),
    total: toCurrency(total),
  };
}

function androidEstimate(
  answers: Record<string, string>,
  secondQuestionAnswer: string | null,
): QuoteEstimate {
  const architecture = answers.app_architecture;
  const monetization = answers.app_monetization;

  const architectureMap: Record<string, number> = {
    nativo: 900,
    hibrido: 700,
    indefinido: 780,
  };

  const monetizationMap: Record<string, number> = {
    gratuito: 0,
    anuncios: 70,
    compras_in_app: 130,
    assinatura: 160,
  };

  const items: QuoteEstimateItem[] = [
    { label: "Discovery e UX do aplicativo", amount: 260 },
    {
      label: "Desenvolvimento base do app",
      amount: architectureMap[architecture] ?? 780,
    },
  ];

  if (hasValue(answers.app_api_integration)) {
    items.push({ label: "Integracoes com APIs externas", amount: 240 });
  }

  if (hasValue(answers.app_login_types)) {
    items.push({ label: "Login e autenticacao de usuarios", amount: 140 });
  }

  if (monetization) {
    items.push({
      label: "Camada de monetizacao",
      amount: monetizationMap[monetization] ?? 0,
    });
  }

  if (answers.app_push_notifications === "sim" || hasValue(answers.app_notification_cases)) {
    items.push({ label: "Notificacoes push", amount: 120 });
  }

  if (answers.app_offline_mode === "sim" || answers.app_offline_mode === "parcial") {
    items.push({
      label: "Estrutura offline",
      amount: answers.app_offline_mode === "sim" ? 260 : 140,
    });
  }

  if (hasValue(answers.app_analytics_metrics)) {
    items.push({ label: "Analytics e eventos", amount: 90 });
  }

  if (answers.app_admin_panel === "sim" || hasValue(answers.app_admin_panel_scope)) {
    items.push({ label: "Painel administrativo do app", amount: 240 });
  }

  if (secondQuestionAnswer) {
    items.push({
      label: `Prioridade da fase 1: ${secondQuestionAnswer}`,
      amount: 110,
    });
  }

  items.push({
    label: "Condição comercial de entrada",
    amount: -180,
  });

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return {
    title: "Pre-orcamento de Aplicacao Android",
    marketReference:
      "Valores ilustrativos. Podemos melhorar o preco apos um orcamento pessoal, dependendo do escopo real e do que ja estiver pronto em layout, fluxo e materiais.",
    items: items.map((item) => ({ ...item, amount: toCurrency(item.amount) })),
    total: toCurrency(total),
  };
}

function systemEstimate(
  answers: Record<string, string>,
  secondQuestionAnswer: string | null,
): QuoteEstimate {
  const systemType = answers.system_type;
  const users = parseNumber(answers.concurrent_users);

  const systemMap: Record<string, number> = {
    erp: 820,
    crm: 560,
    painel_administrativo: 420,
    software_sob_medida: 760,
  };

  const items: QuoteEstimateItem[] = [
    { label: "Mapeamento de processos", amount: 180 },
    {
      label: "Nucleo do sistema",
      amount: systemMap[systemType] ?? 680,
    },
  ];

  if (users > 50) {
    items.push({ label: "Escala para alto volume de usuarios", amount: 320 });
  } else if (users > 10) {
    items.push({ label: "Escala para equipe multiusuario", amount: 160 });
  }

  if (hasValue(answers.main_features)) {
    items.push({ label: "Funcionalidades principais", amount: 220 });
  }

  if (hasValue(answers.needed_reports)) {
    items.push({ label: "Relatorios e dashboards", amount: 110 });
  }

  if (hasValue(answers.existing_database_integration)) {
    items.push({ label: "Integracao com base existente", amount: 180 });
  }

  if (hasAnyValue(answers, ["roles_permissions", "audit_trail_needed"])) {
    items.push({ label: "Permissoes e auditoria", amount: 100 });
  }

  if (hasAnyValue(answers, ["approval_workflows", "workflow_notifications"])) {
    items.push({ label: "Workflows e aprovacoes", amount: 120 });
  }

  if (secondQuestionAnswer) {
    items.push({
      label: `Prioridade da fase 1: ${secondQuestionAnswer}`,
      amount: 90,
    });
  }

  items.push({
    label: "Condição comercial de entrada",
    amount: -140,
  });

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return {
    title: "Pre-orcamento de Sistema Sob Medida",
    marketReference:
      "Valores ilustrativos. Podemos melhorar o preco apos um orcamento pessoal, conforme o nivel de complexidade do sistema e o que ja existir de processo, estrutura ou base.",
    items: items.map((item) => ({ ...item, amount: toCurrency(item.amount) })),
    total: toCurrency(total),
  };
}

function siteAndAppEstimate(
  answers: Record<string, string>,
  secondQuestionAnswer: string | null,
): QuoteEstimate {
  const site = siteEstimate(answers, null);
  const app = androidEstimate(answers, null);

  const items: QuoteEstimateItem[] = [
    { label: "Pacote integrado web + mobile", amount: site.total + app.total - 220 },
  ];

  if (hasValue(answers.sync_between_site_and_app)) {
    items.push({ label: "Sincronizacao entre site e app", amount: 160 });
  }

  if (answers.combined_admin_panel === "sim" || hasValue(answers.combined_admin_scope)) {
    items.push({ label: "Painel central", amount: 180 });
  }

  if (hasAnyValue(answers, ["combined_payment_flow", "combined_order_logic"])) {
    items.push({ label: "Fluxo comercial e pagamentos", amount: 180 });
  }

  if (hasValue(answers.combined_notifications)) {
    items.push({ label: "Notificacoes da plataforma", amount: 100 });
  }

  if (hasValue(answers.combined_authentication)) {
    items.push({ label: "Autenticacao e area do usuario", amount: 120 });
  }

  if (secondQuestionAnswer) {
    items.push({
      label: `Prioridade da fase 1: ${secondQuestionAnswer}`,
      amount: 120,
    });
  }

  items.push({
    label: "Condição comercial de entrada",
    amount: -220,
  });

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return {
    title: "Pre-orcamento de Site e App",
    marketReference:
      "Valores ilustrativos. Podemos melhorar o preco apos um orcamento pessoal, principalmente se parte do material, identidade, conteudo ou regras do projeto ja estiver definida.",
    items: items.map((item) => ({ ...item, amount: toCurrency(item.amount) })),
    total: toCurrency(total),
  };
}

function botEstimate(
  channel: "whatsapp" | "telegram",
  answers: Record<string, string>,
  secondQuestionAnswer: string | null,
): QuoteEstimate {
  const automationType = answers[`automation_type_${channel}`];
  const messages = parseNumber(answers[`auto_message_count_${channel}`]);
  const languages = countLanguages(answers[`supported_languages_${channel}`]);

  const automationMap: Record<string, number> = {
    atendimento: 120,
    vendas: 180,
    funil_de_leads: 170,
    suporte: 130,
  };

  const baseSetup = channel === "whatsapp" ? 180 : 140;
  const platformFirstMonth = channel === "whatsapp" ? 60 : 30;

  const items: QuoteEstimateItem[] = [
    { label: `Implantacao do robo ${channel === "whatsapp" ? "WhatsApp" : "Telegram"}`, amount: baseSetup },
    {
      label: "Fluxo principal de automacao",
      amount: automationMap[automationType] ?? 120,
    },
    { label: "Plataforma e operacao inicial (1o mes)", amount: platformFirstMonth },
  ];

  if (messages > 20) {
    items.push({ label: "Fluxos adicionais de mensagens", amount: 90 });
  } else if (messages > 8) {
    items.push({ label: "Expansao de mensagens automaticas", amount: 45 });
  }

  if (hasValue(answers[`crm_integration_${channel}`])) {
    items.push({ label: "Integracao com CRM ou planilhas", amount: 70 });
  }

  if (languages > 1) {
    items.push({ label: "Suporte multilíngue", amount: 50 });
  }

  if (hasValue(answers[`handoff_to_human_${channel}`])) {
    items.push({ label: "Transbordo para atendimento humano", amount: 60 });
  }

  if (hasValue(answers[`catalog_or_payment_${channel}`])) {
    items.push({ label: "Catalogo e fluxo comercial", amount: 90 });
  }

  if (hasValue(answers[`results_tracking_${channel}`])) {
    items.push({ label: "Relatorios e acompanhamento", amount: 45 });
  }

  if (secondQuestionAnswer) {
    items.push({
      label: `Prioridade da fase 1: ${secondQuestionAnswer}`,
      amount: 60,
    });
  }

  items.push({
    label: "Condição comercial de entrada",
    amount: -70,
  });

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return {
    title: `Pre-orcamento de Robo ${channel === "whatsapp" ? "WhatsApp" : "Telegram"}`,
    marketReference:
      "Valores ilustrativos. Podemos melhorar o preco apos um orcamento pessoal, dependendo do fluxo desejado e do que ja existir de mensagens, processo comercial e integracoes.",
    items: items.map((item) => ({ ...item, amount: toCurrency(item.amount) })),
    total: toCurrency(total),
  };
}

function powerPlatformEstimate(
  answers: Record<string, string>,
  secondQuestionAnswer: string | null,
): QuoteEstimate {
  const flowType = answers.power_platform_flow_type;
  const users = Math.max(parseNumber(answers.power_platform_users), 1);

  const flowMap: Record<string, number> = {
    automacao: 180,
    app_interno: 280,
    dashboard: 220,
  };

  const items: QuoteEstimateItem[] = [
    { label: "Arquitetura da solucao Power Platform", amount: 70 },
    { label: "Desenvolvimento principal", amount: flowMap[flowType] ?? 220 },
    {
      label: `Licenca Power Apps Premium (estimativa de ${users} usuario(s) no 1o mes)`,
      amount: users * 14.5,
    },
  ];

  if (hasValue(answers.microsoft_365_integration)) {
    items.push({ label: "Integracao com Microsoft 365", amount: 70 });
  }

  if (hasValue(answers.custom_reports_needed)) {
    items.push({ label: "Relatorios personalizados", amount: 50 });
  }

  if (hasAnyValue(answers, ["approval_stages", "approval_rules"])) {
    items.push({ label: "Fluxos de aprovacao", amount: 60 });
  }

  if (hasValue(answers.governance_requirements)) {
    items.push({ label: "Governanca e seguranca", amount: 60 });
  }

  if (hasValue(answers.mobile_usage_power_platform)) {
    items.push({ label: "Uso mobile e operacao em campo", amount: 50 });
  }

  if (secondQuestionAnswer) {
    items.push({
      label: `Prioridade da fase 1: ${secondQuestionAnswer}`,
      amount: 45,
    });
  }

  items.push({
    label: "Condição comercial de entrada",
    amount: -60,
  });

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return {
    title: "Pre-orcamento de Aplicacao Power Platform",
    marketReference:
      "Valores ilustrativos. Podemos melhorar o preco apos um orcamento pessoal, dependendo do processo que voce quer automatizar e do que ja existir no ambiente Microsoft da empresa.",
    items: items.map((item) => ({ ...item, amount: toCurrency(item.amount) })),
    total: toCurrency(total),
  };
}

function saasEstimate(
  answers: Record<string, string>,
  secondQuestionAnswer: string | null,
): QuoteEstimate {
  const accessModel = answers.saas_access_model;
  const adminPanel = answers.saas_admin_panel;

  const accessMap: Record<string, number> = {
    assinatura_mensal: 220,
    assinatura_anual: 200,
    setup_mais_mensalidade: 240,
    indefinido: 180,
  };

  const items: QuoteEstimateItem[] = [
    { label: "Arquitetura inicial do SaaS", amount: 320 },
    { label: "Base da plataforma multi-cliente", amount: 980 },
    {
      label: "Modelo comercial e recorrencia",
      amount: accessMap[accessModel] ?? 180,
    },
  ];

  if (hasValue(answers.saas_onboarding_flow)) {
    items.push({ label: "Onboarding e configuracao inicial do cliente", amount: 240 });
  }

  if (hasValue(answers.saas_sales_channels)) {
    items.push({ label: "Integracoes com canais externos", amount: 260 });
  }

  if (hasValue(answers.saas_bot_scope)) {
    items.push({ label: "Bot e automacao principal", amount: 280 });
  }

  if (adminPanel === "sim") {
    items.push({ label: "Painel administrativo interno", amount: 220 });
  } else if (adminPanel === "basico") {
    items.push({ label: "Painel administrativo basico", amount: 120 });
  }

  if (hasValue(answers.saas_client_dashboard)) {
    items.push({ label: "Dashboard do cliente", amount: 170 });
  }

  if (hasValue(answers.saas_user_roles)) {
    items.push({ label: "Perfis de acesso e permissões", amount: 130 });
  }

  if (hasValue(answers.saas_billing_flow)) {
    items.push({ label: "Fluxo de cobranca recorrente", amount: 190 });
  }

  if (hasValue(answers.saas_reports)) {
    items.push({ label: "Metricas e relatorios da plataforma", amount: 110 });
  }

  if (secondQuestionAnswer) {
    items.push({
      label: `Prioridade da fase 1: ${secondQuestionAnswer}`,
      amount: 140,
    });
  }

  items.push({
    label: "Condição comercial de entrada",
    amount: -260,
  });

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return {
    title: "Pre-orcamento de SaaS / Plataforma",
    marketReference:
      "Valores ilustrativos. Podemos ajustar o preco conforme a profundidade do onboarding, as integracoes externas e o nivel de automacao e recorrencia desejados.",
    items: items.map((item) => ({ ...item, amount: toCurrency(item.amount) })),
    total: toCurrency(total),
  };
}

function whiteLabelEstimate(
  answers: Record<string, string>,
  secondQuestionAnswer: string | null,
): QuoteEstimate {
  const visualLevel = answers.wl_visual_customization;
  const adminNeed = answers.wl_admin_need;
  const deliveryScale = Math.max(parseNumber(answers.wl_delivery_scale), 1);

  const visualMap: Record<string, number> = {
    basico: 90,
    medio: 160,
    alto: 260,
  };

  const items: QuoteEstimateItem[] = [
    { label: "Estrutura base do template white label", amount: 360 },
    {
      label: "Personalizacao visual inicial",
      amount: visualMap[visualLevel] ?? 120,
    },
  ];

  if (hasValue(answers.wl_pages_scope)) {
    items.push({ label: "Secoes e conteudo comercial", amount: 140 });
  }

  if (answers.wl_assets_status === "nao") {
    items.push({ label: "Apoio com material visual inicial", amount: 120 });
  } else if (answers.wl_assets_status === "parcial") {
    items.push({ label: "Ajuste de materiais existentes", amount: 60 });
  }

  if (hasValue(answers.wl_contact_channels) || hasValue(answers.wl_catalog_source)) {
    items.push({ label: "Integracoes de contato e canais de venda", amount: 90 });
  }

  if (hasValue(answers.wl_conversion_elements)) {
    items.push({ label: "Elementos de conversao", amount: 80 });
  }

  if (adminNeed === "basico") {
    items.push({ label: "Painel simples para conteudo", amount: 140 });
  } else if (adminNeed === "completo") {
    items.push({ label: "Painel completo de operacao", amount: 240 });
  }

  if (deliveryScale > 5) {
    items.push({
      label: "Preparacao do modelo para escala de entrega",
      amount: 150,
    });
  } else if (deliveryScale > 1) {
    items.push({
      label: "Ajustes para replicacao entre clientes",
      amount: 80,
    });
  }

  if (hasValue(answers.wl_optional_upsells)) {
    items.push({ label: "Estrutura de upsells comerciais", amount: 90 });
  }

  if (secondQuestionAnswer) {
    items.push({
      label: `Prioridade da fase 1: ${secondQuestionAnswer}`,
      amount: 70,
    });
  }

  items.push({
    label: "Condição comercial de entrada",
    amount: -110,
  });

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return {
    title: "Pre-orcamento de White Label",
    marketReference:
      "Valores ilustrativos. Podemos ajustar o preco de acordo com o nivel de personalizacao, a quantidade de clientes que voce quer atender com o mesmo modelo e os extras comerciais desejados.",
    items: items.map((item) => ({ ...item, amount: toCurrency(item.amount) })),
    total: toCurrency(total),
  };
}

export function buildQuoteEstimate(
  type: QuoteOptionId,
  answers: Record<string, string>,
  secondQuestionAnswer: string | null,
): QuoteEstimate {
  // Encaminha o orçamento para a regra específica daquele tipo de solução.
  switch (type) {
    case "Site Web":
      return siteEstimate(answers, secondQuestionAnswer);
    case "Aplicação Android":
      return androidEstimate(answers, secondQuestionAnswer);
    case "Sistema (Programa)":
      return systemEstimate(answers, secondQuestionAnswer);
    case "Site e App":
      return siteAndAppEstimate(answers, secondQuestionAnswer);
    case "Robo Venda Whatsapp":
      return botEstimate("whatsapp", answers, secondQuestionAnswer);
    case "Robo Venda Telegram":
      return botEstimate("telegram", answers, secondQuestionAnswer);
    case "Aplicação Power Platform":
      return powerPlatformEstimate(answers, secondQuestionAnswer);
    case "SaaS / Plataforma":
      return saasEstimate(answers, secondQuestionAnswer);
    case "White Label":
      return whiteLabelEstimate(answers, secondQuestionAnswer);
    default:
      return {
        title: "Pre-orcamento",
        marketReference: "Estimativa inicial.",
        items: [],
        total: 0,
      };
  }
}
