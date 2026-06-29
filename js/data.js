window.QUIZ_BLOCKS = [
  { id: 1, title: "Copilot Producto", subtitle: "Instructions, Skills, Agents" },
  { id: 2, title: "Seguridad LLM", subtitle: "Prompt injection, PII, OWASP" },
  { id: 3, title: "Gobierno", subtitle: "Ciclo de vida y versionado" },
  { id: 4, title: "Metricas y ROI", subtitle: "Impacto y negocio" },
  { id: 5, title: "RAG y Retrieval", subtitle: "Chunking, embeddings, permisos" },
  { id: 6, title: "Comunicacion Ejecutiva", subtitle: "CTO y argumentacion" },
  { id: 7, title: "Engineering Loops", subtitle: "Prompt, Loop, Harness" }
];

window.QUIZ_QUESTIONS = [
  // Bloque 1 (10)
  {
    id: 1,
    block: 1,
    question: "En GitHub Copilot, cual es el archivo de instructions global del repositorio?",
    options: [".github/copilot-instructions.md", "AGENTS.md", ".github/instructions/global.md"],
    correctIndex: 0,
    explanation: "El archivo oficial de contexto global es .github/copilot-instructions.md."
  },
  {
    id: 2,
    block: 1,
    question: "Que campo del frontmatter permite que una instruction aplique solo a ciertos archivos?",
    options: ["target", "applyTo", "scope"],
    correctIndex: 1,
    explanation: "applyTo usa glob patterns para limitar a que rutas/archivos aplica la instruction."
  },
  {
    id: 3,
    block: 1,
    question: "En un SKILL.md de Copilot, que campo es clave para la discoverability de la skill?",
    options: ["description", "license", "owner"],
    correctIndex: 0,
    explanation: "description define que hace la skill y cuando debe activarse."
  },
  {
    id: 4,
    block: 1,
    question: "Donde se ubican los custom agents en el repositorio de Copilot?",
    options: [".github/skills/", ".github/agents/", ".copilot/agents/"],
    correctIndex: 1,
    explanation: "Los agentes custom se guardan en .github/agents/*.agent.md."
  },
  {
    id: 5,
    block: 1,
    question: "Si necesitas conectar Copilot con Jira o una API interna, que usas?",
    options: ["Knowledge Base", "Extension o MCP server", "Instruction applyTo"],
    correctIndex: 1,
    explanation: "Para conectar sistemas externos usas extensiones o MCP servers."
  },
  {
    id: 6,
    block: 1,
    question: "Que feature de Copilot Enterprise sirve para responder con documentacion interna?",
    options: ["Actions Insights", "Knowledge Bases", "Branch Rules"],
    correctIndex: 1,
    explanation: "Knowledge Bases implementa retrieval sobre contenidos internos."
  },
  {
    id: 7,
    block: 1,
    question: "En un .agent.md, que campo controla las herramientas disponibles del agente?",
    options: ["permissions", "tools", "capabilities"],
    correctIndex: 1,
    explanation: "El campo tools define que capacidades operativas tiene el agente."
  },
  {
    id: 8,
    block: 1,
    question: "Cual de estas afirmaciones es correcta sobre SKILL.md en OpenCode y Copilot?",
    options: ["Son conceptos equivalentes con formato compatible", "No tienen relacion", "OpenCode no usa skills"],
    correctIndex: 0,
    explanation: "La estructura SKILL.md es compatible conceptualmente y practicamente entre ecosistemas."
  },
  {
    id: 9,
    block: 1,
    question: "Si quieres reglas especiales para TypeScript, donde conviene ponerlas?",
    options: [".github/instructions/typescript.instructions.md", ".github/agents/typescript.agent.md", ".github/skills/typescript/SKILL.md"],
    correctIndex: 0,
    explanation: "Las reglas por tipo de archivo se modelan en instructions con applyTo."
  },
  {
    id: 10,
    block: 1,
    question: "Que diferencia principal hay entre Skill y Agent?",
    options: ["Skill orquesta multiples tools autonomamente y Agent no", "Skill define un flujo especializado; Agent tiene identidad/rol/tools propios", "No hay diferencia real"],
    correctIndex: 1,
    explanation: "La skill encapsula una tarea; el agent tiene personalidad operativa y herramientas declaradas."
  },

  // Bloque 2 (10)
  {
    id: 11,
    block: 2,
    question: "Que es prompt injection?",
    options: ["Optimizar prompts para menor costo", "Ataque que intenta manipular instrucciones del agente", "Uso de embeddings en prompts"],
    correctIndex: 1,
    explanation: "Prompt injection busca desviar el comportamiento del agente con instrucciones maliciosas."
  },
  {
    id: 12,
    block: 2,
    question: "Cual es una mitigacion basica contra prompt injection?",
    options: ["Concatenar input del usuario al system prompt", "Separar roles system/user y validar input", "Aumentar temperatura del modelo"],
    correctIndex: 1,
    explanation: "Role separation + input validation es una defensa base esencial."
  },
  {
    id: 13,
    block: 2,
    question: "Least privilege en agentes significa:",
    options: ["Dar acceso total para evitar bloqueos", "Dar solo permisos estrictamente necesarios", "No usar herramientas externas nunca"],
    correctIndex: 1,
    explanation: "Menor privilegio reduce superficie de ataque y riesgo operativo."
  },
  {
    id: 14,
    block: 2,
    question: "Cual es un ejemplo de indirect prompt injection?",
    options: ["Usuario escribe 'ignora todo' en chat", "Instruccion maliciosa escondida en documento/email que el agente procesa", "Un typo en el prompt del developer"],
    correctIndex: 1,
    explanation: "Indirect injection llega por fuentes externas consumidas por el agente."
  },
  {
    id: 15,
    block: 2,
    question: "PII masking se aplica principalmente para:",
    options: ["Reducir latencia del modelo", "Enmascarar datos sensibles antes de enviar contexto al LLM", "Mejorar precision semantica"],
    correctIndex: 1,
    explanation: "PII masking evita exponer informacion personal/critica al proveedor del modelo."
  },
  {
    id: 16,
    block: 2,
    question: "Output validation implica:",
    options: ["Ejecutar inmediatamente lo que genera el LLM", "Revisar y filtrar salida antes de ejecutar acciones", "Solo guardar logs"],
    correctIndex: 1,
    explanation: "Nunca ejecutes salida sin validacion previa, especialmente scripts o SQL."
  },
  {
    id: 17,
    block: 2,
    question: "Que riesgo describe data exfiltration?",
    options: ["Perder contexto por token limit", "Extraccion no autorizada de datos sensibles", "Timeout en API externa"],
    correctIndex: 1,
    explanation: "Data exfiltration es fuga de datos fuera del perimetro autorizado."
  },
  {
    id: 18,
    block: 2,
    question: "En OWASP Top 10 for LLMs, el riesgo LLM01 es:",
    options: ["Prompt Injection", "Model Theft", "Insecure Plugin UX"],
    correctIndex: 0,
    explanation: "LLM01 corresponde a Prompt Injection."
  },
  {
    id: 19,
    block: 2,
    question: "Que deberias loggear para auditoria de seguridad en agentes?",
    options: ["Solo errores 500", "Input, tools usadas, output, usuario y timestamp", "Solo prompts del system"],
    correctIndex: 1,
    explanation: "Audit logging requiere trazabilidad completa de cada ejecucion."
  },
  {
    id: 20,
    block: 2,
    question: "Si un agente de soporte tiene acceso write/delete en produccion, eso indica:",
    options: ["Exceso de agencia y mal diseno de permisos", "Alta productividad", "Mejor resiliencia"],
    correctIndex: 0,
    explanation: "Es un anti-patron de seguridad: privilegios excesivos para tarea de bajo alcance."
  },

  // Bloque 3 (10)
  {
    id: 21,
    block: 3,
    question: "Cual secuencia representa mejor el ciclo de vida de artefactos?",
    options: ["draft -> review -> approved -> published -> deprecated -> archived", "draft -> published -> review -> archived", "review -> draft -> published -> done"],
    correctIndex: 0,
    explanation: "Ese flujo asegura control, adopcion y retiro ordenado."
  },
  {
    id: 22,
    block: 3,
    question: "Cuando un artefacto esta deprecated significa:",
    options: ["Debe dejar de usarse de inmediato y borrar historial", "Sigue funcionando pero se recomienda migrar", "Esta en fase de desarrollo"],
    correctIndex: 1,
    explanation: "Deprecated permite ventana de migracion antes del archivado final."
  },
  {
    id: 23,
    block: 3,
    question: "En semantic versioning, un cambio breaking debe incrementar:",
    options: ["PATCH", "MINOR", "MAJOR"],
    correctIndex: 2,
    explanation: "Breaking change implica nuevo MAJOR (ej. 1.x.x -> 2.0.0)."
  },
  {
    id: 24,
    block: 3,
    question: "Ownership en catalogo de artefactos sirve para:",
    options: ["Definir quien responde ante incidentes y mantenimiento", "Elegir modelo LLM por defecto", "Reducir costo de tokens"],
    correctIndex: 0,
    explanation: "Sin owner, no hay accountability operativa."
  },
  {
    id: 25,
    block: 3,
    question: "Que debe incluir una entrada madura de catalogo?",
    options: ["Solo nombre y descripcion", "Estado, version, owner, permisos, casos soportados, changelog", "Solo ejemplos de prompts"],
    correctIndex: 1,
    explanation: "Un catalogo enterprise exige metadata operativa completa."
  },
  {
    id: 26,
    block: 3,
    question: "Para evitar duplicidad de skills, en que estado lo detectas mejor?",
    options: ["review", "archived", "published"],
    correctIndex: 0,
    explanation: "La validacion de redundancia ocurre en la revision tecnica."
  },
  {
    id: 27,
    block: 3,
    question: "Que describe mejor un sunset date?",
    options: ["Fecha de creacion del artefacto", "Fecha limite para migrar antes de archivado", "Fecha del ultimo commit"],
    correctIndex: 1,
    explanation: "Sunset date marca el fin de soporte/uso recomendado."
  },
  {
    id: 28,
    block: 3,
    question: "Changelog obligatorio ayuda principalmente en:",
    options: ["Trazabilidad y comunicacion de cambios", "Aumentar contexto del modelo", "Reducir tamaño de prompts"],
    correctIndex: 0,
    explanation: "Sin changelog, el versionado pierde valor operativo."
  },
  {
    id: 29,
    block: 3,
    question: "Que es backward compatibility en este contexto?",
    options: ["Que el nuevo artefacto sea mas rapido", "Que versiones previas sigan funcionando durante migracion", "Que use menos memoria"],
    correctIndex: 1,
    explanation: "Compatibilidad evita romper flujos existentes al actualizar."
  },
  {
    id: 30,
    block: 3,
    question: "Si no hay owner activo para un artefacto critico, primera accion correcta:",
    options: ["Ignorarlo hasta que falle", "Asignar ownership formal y actualizar catalogo", "Eliminarlo de inmediato"],
    correctIndex: 1,
    explanation: "Restablecer ownership es paso base para gobernarlo."
  },

  // Bloque 4 (10)
  {
    id: 31,
    block: 4,
    question: "Que es baseline en un programa de AI Coding?",
    options: ["Costo minimo del proveedor LLM", "Medicion inicial antes de cambios para comparar impacto", "Promedio de tokens por prompt"],
    correctIndex: 1,
    explanation: "Sin baseline no puedes demostrar mejora real."
  },
  {
    id: 32,
    block: 4,
    question: "Time-to-merge mide:",
    options: ["Tiempo de build de CI", "Tiempo desde apertura de PR hasta merge", "Tiempo de lectura de instrucciones"],
    correctIndex: 1,
    explanation: "Es una metrica clave de velocidad del flujo de entrega."
  },
  {
    id: 33,
    block: 4,
    question: "Defect rate se calcula como:",
    options: ["Bugs reportados / PRs mergeados en periodo", "Commits por desarrollador / sprint", "Tests fallidos / tests totales"],
    correctIndex: 0,
    explanation: "Relaciona calidad con volumen de entrega."
  },
  {
    id: 34,
    block: 4,
    question: "Code churn alto suele indicar:",
    options: ["Codigo estable y maduro", "Mucho retrabajo y baja estabilidad de cambios", "Mayor cobertura de tests"],
    correctIndex: 1,
    explanation: "Reescritura frecuente suele asociarse a calidad deficiente o mala definicion inicial."
  },
  {
    id: 35,
    block: 4,
    question: "Developer NPS aporta principalmente:",
    options: ["Satisfaccion/adopcion cualitativa del programa", "Costo de licencias exacto", "Conteo de vulnerabilidades"],
    correctIndex: 0,
    explanation: "Complementa metricas duras con percepcion real de los equipos."
  },
  {
    id: 36,
    block: 4,
    question: "Para optimizar token cost, la estrategia recomendada es:",
    options: ["Usar siempre el modelo mas caro", "Asignar modelo segun complejidad de tarea", "Deshabilitar skills"],
    correctIndex: 1,
    explanation: "Model routing por complejidad reduce costo sin degradar calidad critica."
  },
  {
    id: 37,
    block: 4,
    question: "Si solo mides invocaciones de agents, que te falta para probar ROI?",
    options: ["Nada, con uso alcanza", "Correlacion con velocidad/calidad (time-to-merge, defect rate, etc.)", "Mas prompts largos"],
    correctIndex: 1,
    explanation: "Uso sin impacto no demuestra valor de negocio."
  },
  {
    id: 38,
    block: 4,
    question: "Que metrica muestra friccion en revision de PRs?",
    options: ["PR review time", "Prompt temperature", "Context window"],
    correctIndex: 0,
    explanation: "PR review time refleja si los cambios llegan claros y revisables."
  },
  {
    id: 39,
    block: 4,
    question: "ROI para direccion se comunica mejor como:",
    options: ["Horas ahorradas + calidad + costo neto", "Solo numero de prompts", "Solo ranking de modelos"],
    correctIndex: 0,
    explanation: "Un enfoque ejecutivo combina eficiencia, calidad y costo."
  },
  {
    id: 40,
    block: 4,
    question: "Si el costo de tokens sube pero defect rate baja fuerte y time-to-merge cae, la lectura correcta es:",
    options: ["El programa fracaso", "Necesitas evaluar costo-beneficio neto, no solo costo bruto", "Debes detener IA inmediatamente"],
    correctIndex: 1,
    explanation: "El analisis correcto es de valor neto global, no de un KPI aislado."
  },

  // Bloque 5 (10)
  {
    id: 41,
    block: 5,
    question: "RAG significa:",
    options: ["Runtime Agent Graph", "Retrieval Augmented Generation", "Repository Access Governance"],
    correctIndex: 1,
    explanation: "RAG recupera contexto relevante antes de generar respuesta."
  },
  {
    id: 42,
    block: 5,
    question: "Chunking es:",
    options: ["Entrenar un modelo desde cero", "Dividir documentos en fragmentos para indexar", "Comprimir logs de agentes"],
    correctIndex: 1,
    explanation: "Chunking permite retrieval util dentro del limite de contexto."
  },
  {
    id: 43,
    block: 5,
    question: "Embeddings se usan para:",
    options: ["Representar semanticamente texto en vectores", "Firmar commits", "Versionar prompts"],
    correctIndex: 0,
    explanation: "Los embeddings capturan similitud semantica entre textos."
  },
  {
    id: 44,
    block: 5,
    question: "Un vector store sirve para:",
    options: ["Guardar solo logs de auditoria", "Buscar por similitud semantica eficientemente", "Reemplazar CI/CD"],
    correctIndex: 1,
    explanation: "Es la base de datos adecuada para retrieval vectorial."
  },
  {
    id: 45,
    block: 5,
    question: "Permission-aware retrieval significa:",
    options: ["Recuperar los chunks mas largos", "Filtrar retrieval segun permisos del usuario", "Permitir acceso admin a todos"],
    correctIndex: 1,
    explanation: "El agente no debe recuperar contenido que el usuario no puede ver."
  },
  {
    id: 46,
    block: 5,
    question: "Cual es un riesgo clasico en RAG multiusuario?",
    options: ["Cross-user data leakage", "Semantic overlap positivo", "Token normalization"],
    correctIndex: 0,
    explanation: "Mala separacion de cache/contexto puede filtrar datos entre usuarios."
  },
  {
    id: 47,
    block: 5,
    question: "Si tus chunks son demasiado pequenos, el problema probable es:",
    options: ["Mayor precision siempre", "Perdida de contexto semantico", "Costo alto inevitable"],
    correctIndex: 1,
    explanation: "Chunks muy pequenos fragmentan significado y empeoran respuestas."
  },
  {
    id: 48,
    block: 5,
    question: "Si tus chunks son demasiado grandes, el impacto comun es:",
    options: ["Menor costo y mayor velocidad", "Mayor costo y ruido contextual", "No cambia nada"],
    correctIndex: 1,
    explanation: "Chunks grandes meten contexto irrelevante y suben tokens."
  },
  {
    id: 49,
    block: 5,
    question: "Knowledge Bases de Copilot Enterprise es, conceptualmente:",
    options: ["Una forma gestionada de RAG", "Un reemplazo de Git", "Solo un dashboard de costos"],
    correctIndex: 0,
    explanation: "Knowledge Bases implementa retrieval sobre contenido interno."
  },
  {
    id: 50,
    block: 5,
    question: "En RAG, grounding ayuda a:",
    options: ["Anclar respuesta en fuentes reales y reducir alucinaciones", "Aumentar temperatura", "Desactivar validacion"],
    correctIndex: 0,
    explanation: "Grounding reduce respuestas inventadas y mejora trazabilidad."
  },

  // Bloque 6 (10)
  {
    id: 51,
    block: 6,
    question: "Para hablar con un CTO, conviene traducir seguridad de agentes como:",
    options: ["Riesgo de fuga de datos y costo de incidente", "Prompt templates y embeddings", "Top-k retrieval tuning"],
    correctIndex: 0,
    explanation: "Lenguaje ejecutivo prioriza riesgo, costo e impacto operativo."
  },
  {
    id: 52,
    block: 6,
    question: "Si te preguntan algo que no dominas, mejor respuesta es:",
    options: ["Inventar una respuesta confiada", "Admitir limite, mapear a concepto equivalente y explicar criterio", "Evadir la pregunta"],
    correctIndex: 1,
    explanation: "Honestidad tecnica + capacidad de transferencia genera confianza."
  },
  {
    id: 53,
    block: 6,
    question: "Que estructura simple te ayuda a responder preguntas dificiles?",
    options: ["PREP (Punto, Razon, Ejemplo, Punto)", "CRUD", "SOLID"],
    correctIndex: 0,
    explanation: "PREP te mantiene claro, concreto y persuasivo."
  },
  {
    id: 54,
    block: 6,
    question: "El costo de NO tener gobierno de artefactos incluye:",
    options: ["Solo menor creatividad del equipo", "Fugas, duplicidad, deuda tecnica y falta de ownership", "Unicamente mas reuniones"],
    correctIndex: 1,
    explanation: "Ese es el argumento ejecutivo central del rol."
  },
  {
    id: 55,
    block: 6,
    question: "Una buena pregunta al entrevistador para este rol es:",
    options: ["Cuantos dias libres hay?", "Como mediran el exito de la posicion en 6 meses?", "Que IDE usan los juniors?"],
    correctIndex: 1,
    explanation: "Muestra orientacion a resultados y claridad de expectativas."
  },
  {
    id: 56,
    block: 6,
    question: "Cuando presentas ROI al negocio, que enfoque convence mas?",
    options: ["Solo tecnologia usada", "Baseline vs actual + horas/defectos/costo neto", "Solo percepcion del equipo"],
    correctIndex: 1,
    explanation: "El negocio decide con comparacion objetiva y valor neto."
  },
  {
    id: 57,
    block: 6,
    question: "En discurso ejecutivo, 'falta de output validation' se traduce como:",
    options: ["El agente puede ejecutar acciones no seguras con impacto real", "La UI del chat es lenta", "No hay tests snapshot"],
    correctIndex: 0,
    explanation: "Siempre conecta tecnica con riesgo operacional concreto."
  },
  {
    id: 58,
    block: 6,
    question: "Que transmite mejor perfil de habilitador (no solo auditor)?",
    options: ["Bloquear todo artefacto nuevo", "Combinar estandares con capacitacion y adopcion guiada", "Delegar todo a seguridad"],
    correctIndex: 1,
    explanation: "El rol pide impulsar adopcion con criterio, no frenar por defecto."
  },
  {
    id: 59,
    block: 6,
    question: "Al contar tu experiencia OpenCode para un rol Copilot, la estrategia correcta es:",
    options: ["Ocultarla para no confundir", "Mapear equivalencias de concepto y formato con claridad", "Decir que son exactamente lo mismo en todo"],
    correctIndex: 1,
    explanation: "Transferencia explicita demuestra madurez tecnica y adaptabilidad."
  },
  {
    id: 60,
    block: 6,
    question: "Que error debes evitar al responder bajo presion?",
    options: ["Pedir 3 segundos para pensar", "Afirmar sin evidencia tecnica", "Dar un ejemplo concreto"],
    correctIndex: 1,
    explanation: "Sin evidencia, pierdes credibilidad rapidamente en entrevistas tecnicas."
  },

  // Bloque 7 (10)
  {
    id: 61,
    block: 7,
    question: "Prompt engineering se enfoca en:",
    options: ["Disenar instrucciones/contexto para obtener mejor salida del LLM", "Reducir tamano de repositorio", "Configurar GitHub Actions"],
    correctIndex: 0,
    explanation: "Es diseno intencional de entradas y estructura de razonamiento del modelo."
  },
  {
    id: 62,
    block: 7,
    question: "Few-shot prompting consiste en:",
    options: ["No dar ejemplos al modelo", "Dar varios ejemplos antes de la tarea", "Pedir salida en JSON siempre"],
    correctIndex: 1,
    explanation: "Few-shot usa ejemplos para guiar formato y comportamiento."
  },
  {
    id: 63,
    block: 7,
    question: "Chain-of-Thought (CoT) ayuda a:",
    options: ["Forzar razonamiento paso a paso en tareas complejas", "Aumentar rapidez de UI", "Desactivar tools"],
    correctIndex: 0,
    explanation: "CoT mejora consistencia en analisis no triviales."
  },
  {
    id: 64,
    block: 7,
    question: "ReAct combina principalmente:",
    options: ["Reasoning + Acting", "Retrieval + Alignment", "Rendering + Caching"],
    correctIndex: 0,
    explanation: "Patron de agente: razona, actua, observa y repite."
  },
  {
    id: 65,
    block: 7,
    question: "Human-in-the-Loop (HITL) significa:",
    options: ["El humano aprueba antes de ejecutar accion critica", "El humano revisa solo al final", "No participa nunca"],
    correctIndex: 0,
    explanation: "HITL pone checkpoint humano previo para acciones de alto riesgo."
  },
  {
    id: 66,
    block: 7,
    question: "Human-on-the-Loop (HotL) significa:",
    options: ["Autonomia total sin supervisión", "El sistema actua y humano puede intervenir/rollback", "Solo modo lectura"],
    correctIndex: 1,
    explanation: "HotL mantiene supervisión humana posterior con capacidad de correccion."
  },
  {
    id: 67,
    block: 7,
    question: "Un reflection loop en agentes busca:",
    options: ["Que el agente revise y mejore su propia salida", "Cambiar modelo automaticamente", "Multiplicar prompts en paralelo"],
    correctIndex: 0,
    explanation: "Es autocritica iterativa antes de entregar resultado final."
  },
  {
    id: 68,
    block: 7,
    question: "Harness engineering en este contexto se refiere a:",
    options: ["Infraestructura de pruebas para validar agentes", "Branding de equipo de IA", "Solo documentacion de arquitectura"],
    correctIndex: 0,
    explanation: "Test harness incluye fixtures, mocks, casos borde y validaciones de seguridad."
  },
  {
    id: 69,
    block: 7,
    question: "En un test harness de agentes, un mock sirve para:",
    options: ["Simular sistemas externos sin impactar produccion", "Ocultar errores del agente", "Incrementar temperatura"],
    correctIndex: 0,
    explanation: "Mocks desacoplan pruebas de servicios reales para pruebas confiables."
  },
  {
    id: 70,
    block: 7,
    question: "Cuando alguien usa 'harness engineering' para hablar de adopcion y experiencia developer, el termino mas preciso suele ser:",
    options: ["Developer Experience / Developer Enablement", "Prompt sanitation", "Vector normalization"],
    correctIndex: 0,
    explanation: "Harness se centra en testing; adopcion/habilitacion corresponde a DevEx/Enablement."
  }
];
