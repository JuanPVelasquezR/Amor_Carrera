export type StageId =
  | 'cover'
  | 'thoughts'
  | 'questions'
  | 'thermometer'
  | 'simulator'
  | 'closing';

export interface StageMeta {
  id: StageId;
  number: string;
  shortLabel: string;
  title: string;
  subtitle: string;
}

export const STAGES: StageMeta[] = [
  {
    id: 'cover',
    number: '00',
    shortLabel: 'Inicio',
    title: 'Portada',
    subtitle: 'Para empezar con calma',
  },
  {
    id: 'thoughts',
    number: '01',
    shortLabel: 'Lo que pienso',
    title: 'Mis pensamientos',
    subtitle: 'Cinco partes con lo que veo y siento',
  },
  {
    id: 'questions',
    number: '02',
    shortLabel: 'Preguntas',
    title: 'Preguntas solo para ti',
    subtitle: 'Once preguntas para leer sin afán',
  },
  {
    id: 'thermometer',
    number: '03',
    shortLabel: 'Termómetro',
    title: '¿Qué está pesando hoy?',
    subtitle: 'Un espejo visual de cuatro fuerzas',
  },
  {
    id: 'simulator',
    number: '04',
    shortLabel: 'Simulador',
    title: 'Los dos botones',
    subtitle: 'Escuchar qué dice tu cuerpo al decidir',
  },
  {
    id: 'closing',
    number: '05',
    shortLabel: 'Cierre',
    title: 'Una última nota',
    subtitle: 'Sin afán, aquí estoy',
  },
];

export interface ThoughtChapter {
  id: string;
  indexLabel: string;
  kicker: string;
  title: string;
  paragraphs: string[];
  highlightQuote?: string;
}

export const THOUGHT_CHAPTERS: ThoughtChapter[] = [
  {
    id: 'tus-zapatos',
    indexLabel: 'Parte 1 de 5',
    kicker: 'En tus zapatos',
    title: 'Preguntas antes que respuestas',
    paragraphs: [
      'Ya te compartí un poco de mi apreciación general sobre el tema, pero siento que en todo esto hay tal vez más preguntas que respuestas. Obviamente no te quiero llenar únicamente de preguntas, porque sé que también esperas respuestas de mi parte —y te las voy a dar—, pero siento que en ciertos puntos es más valioso para ti que te devuelva una buena pregunta a que te dé una respuesta cerrada.',
      'La primera sería: ¿hacia qué corres o de qué huyes? Porque es muy diferente. Es decir, ¿sientes que quieres pasarte a Biología porque descubriste que ahí hay algo que de verdad te mueve, porque te diste cuenta de que es un camino con muchas cosas más propicias para ti, o porque hay un agotamiento con Física? Me parece clave identificar esa diferencia: ¿te estás acercando a algo o alejándote de algo? Yo pienso que tú más bien te estás acercando a algo. Aquí también entra un poco lo que tú misma me decías de que puede haber un pequeño sesgo con Física por todas las situaciones y conflictos difíciles que te ha tocado vivir mientras estás en la carrera; creo que esta pregunta también ayuda a mirar eso.',
      'La segunda —que me imagino que sí, que ya te estás metiendo un poco más en eso— es si ya conoces la parte dura de Biología: la parte burocrática, el estrés, los retos laborales; no solamente ver el pénsum, sino qué hacen de verdad los egresados más allá de lo que podemos ver en Bella. Porque Bella es como un tráiler, muy bonito, pero también hay que mirar la carrera real completa, y eso me parece muy importante.',
      'Y la última, que para mí es de las más importantes —y que se conecta con lo que me decías de tu familia—, es qué te está pesando más en el miedo de soltar Física: ¿el amor por la carrera o la identidad? Es muy común que cuando uno desde el colegio o desde P11 venía diciendo "voy a estudiar Física", cambiar se sienta como traicionarse a uno mismo, aunque el "yo" de hace cuatro años no sea el mismo de hoy. Entonces me parece fundamental que identifiques qué es lo que te está pesando de verdad, tanto por dentro como en lo social y con tu familia: si el amor por Física o la identidad que forjaste alrededor de ella. Además, yo sé que al final tú no estarías soltando la física al 100%, porque siguen siendo ciencias hermanas, del mismo mundo, pero igual es algo muy importante para tener en cuenta.',
    ],
  },
  {
    id: 'mis-zapatos',
    indexLabel: 'Parte 2 de 5',
    kicker: 'Desde mis zapatos',
    title: 'El desfase entre los dos',
    paragraphs: [
      'Ahora sí llega mi parte de responderte sobre el desfase que mencionabas, de que tú seguirías estudiando mientras yo tal vez ya estaría trabajando por mi avance en la carrera. Intento enfocarlo en un punto intermedio entre lo real y lo romántico, porque la verdad es que en este caso los dos lados son igual de válidos.',
      'Cuando me siento a pensar en cómo me imagino los próximos tres a cinco años —o más, que claro que está por verse— mientras yo trabajo y tú sigues estudiando, pienso en lo cotidiano: que tendríamos horarios distintos, ingresos distintos, cómo proyectaríamos los planes para vivir juntos, viajar y todo eso. Y me doy cuenta de que, incluso tú siguiendo en Física, el futuro era bastante similar, porque igual a ti todavía te faltaban unos cuantos años en Física y a mí, aunque me falten menos en software, tampoco era que fuéramos a salir al mismo tiempo. Entonces no es una realidad nueva. No es que yo me esté enfrentando a un cambio total de paradigma donde pensaba "en un año ambos trabajamos, ganamos nuestra plata y nos vamos a vivir juntos porque ya nos podemos sostener". No es un cambio de paradigma, es simplemente una ampliación o un reajuste de tiempo y de enfoque. Como yo no tenía una fecha clavada en la cabeza de "en un año o dos pasa esto", a mí ese cambio no me genera un golpe fuerte.',
      'También entran otras cosas que tú igual me podrás comentar. Yo sé que tú eres una persona que no se queda quieta —y no lo digo para nada como un mecanismo de presión ni para decirte que mientras estudias tienes que trabajar porque yo estaré trabajando—, sino simplemente pensando en cómo eres: muy seguramente en algún punto, aunque estés estudiando, igual hagas cosas o tengas algún trabajo, como lo que me decías del domo, por poner cualquier ejemplo. Y aun si no, yo tampoco veo como una limitación acompañarte a ese ritmo, ni siento que sea una presión silenciosa, ni que me estés "atrasando".',
      'En este momento, no sé si es porque esté ignorando alguna parte del panorama o si de verdad lo estoy viendo todo, pero desde lo que alcanzo a ver, no lo siento como un cambio gigante ni como un desfase enorme. Esto también se conecta con lo que hemos hablado —intentando que no quede solo en lo filosófico sino aterrizado a la vida real— de esa idea de una vida un poco más bohemia o de "mundo abierto", donde no hay que seguir un estándar estricto de que a esta edad te gradúas, a esta edad trabajas, a esta edad tienes hijos... No todos los caminos tienen que ser iguales ni ir en paralelo.',
      'Ni siquiera me dan ganas de cerrar esta parte diciendo "yo asumiría esto" o "yo estaría dispuesto a aceptarlo", porque es que no lo veo como una carga que uno tenga que asumir o aguantar, sino como parte del flujo natural de la vida. Y dándole vueltas a todo esto me llegó una pregunta que siento que se responde sola y resume toda esta parte:',
    ],
    highlightQuote:
      '¿Prefieres a una pareja que vaya a tu ritmo o a una pareja que esté haciendo lo que la hace feliz?',
  },
  {
    id: 'familia',
    indexLabel: 'Parte 3 de 5',
    kicker: 'El ruido externo',
    title: 'La familia y las opiniones ajenas',
    paragraphs: [
      'Aquí llegamos a una de las cosas que más pesan en este punto: todo el ruido externo que gira alrededor de cambiarte de carrera ahora, y la falacia del costo hundido —que es una falacia real—. Pero creo que aquí lo más importante, amor, es mirar la economía y la estabilidad familiar, es decir, qué tipo de impacto tienen en verdad las opiniones de tu familia.',
      'No es lo mismo que la preocupación sea "me van a regañar" o "ciertos familiares se van a decepcionar durante unos meses" —que es un impacto emocional—, a que la preocupación sea "necesito graduarme rápido porque si no me quitan el apoyo económico" —que sería un impacto material real—. Hay que ver cuál de los dos es tu caso o si es una mezcla. Por lo que me has contado, tu preocupación es mucho más emocional: qué van a pensar, qué van a hablar, cuánto tiempo van a estar mencionando el cambio de carrera. Porque tus papás ya te dijeron que mantendrían su apoyo; ellos son conscientes de que tú no eres una vaga, de que no te estás cambiando para alargar el tiempo en el que tienes un colchón y relajarte sin hacer nada viviendo de ellos, sino que es un cambio enfocado en tu proyecto y tu calidad de vida.',
      'Identificar que gran parte de ese peso es emocional y no material no significa que importe menos, porque sé cuánto te importa tu familia y cómo te impactan esas opiniones. Sin embargo —y más ahora que tú misma estás trabajando en ese proceso de cómo te afectan las opiniones de los demás—, mira quiénes son los pilares de tu vida, las personas que tú me has dicho que más te importan: tus papás, Vale y yo. Y todos, cada uno a su manera, te estamos diciendo "piénsalo, míralo bien, pero está bien, si lo quieres hacer, hazlo".',
      'Obviamente la opinión de otros familiares va a incomodar cuando tomes la decisión, pero si no tomas la decisión por otro motivo, está perfecto; en cambio, si no la tomas únicamente por el "qué van a decir", ahí sí siento que sería traicionarte a ti misma. Por eso te propongo este ejercicio mental: si te quedas en Física solo por no incomodar a tu familia —no porque concluyas que es lo que quieres, sino solo por ellos—, ¿cómo te vas a sentir durante esos tres años? ¿Y cuánto suele durar realmente todo ese ruido familiar cuando ven a alguien feliz y comprometido con lo que eligió? Al final, la conversación más dura ya la tuviste, que era con tus papás —que son los únicos a los que de verdad les tienes que responder—. La parte difícil ya pasó; lo que queda son solo opiniones externas.',
    ],
  },
  {
    id: 'estrategia',
    indexLabel: 'Parte 4 de 5',
    kicker: 'Cabeza fría',
    title: 'Cambiar ya vs. terminar Física y luego Biología',
    paragraphs: [
      'Esta parte hay que tomarla con pinzas porque es más objetiva que subjetiva, y quise respaldarla con cosas reales ya que he estado averiguando un poco. Es el tema de cambiarte ya a Biología o terminar Física para después hacer Biología —porque tú me has dicho que ese sería el plan: si te quedas en Física, igual luego saltar a Biología—.',
      'Pero ahí está la pregunta clave: ¿terminar Física y luego hacer Biología es realmente realista? En Colombia, dos pregrados en ciencias básicas y naturales en una universidad constante son mínimo 10 años, pero sabiendo cómo son los tiempos en la UdeA, eso se puede ir fácilmente a 15 o 16 años. Hay que pensar de verdad si tienes la energía, el tiempo y los recursos para eso, o si ese plan de "hago las dos" es más bien una forma de no renunciar a nada y evitar el dolor de elegir, como decir "no estoy eligiendo, simplemente elijo ambas". Personalmente, siento que puede ir un poco más por el lado de no querer renunciar a ninguna que por una ruta realista. Y claro, estudiar en una universidad es muy diferente a estudiar por cuenta propia, pero el estudio independiente igual sigue siendo súper valioso: si estudias Biología y por tu cuenta sigues dándole a la Física, igual no te estás saltando la etapa universitaria, simplemente la vives en Biología. Eso te lo dejo ahí como una idea al aire.',
      'Otra cosa muy importante es mirar cuánto tiempo cambia realmente si te pasas ya. Ahorita vas más o menos por quinto semestre, pero con materias en desorden, unas de un semestre y otras de otro. Entonces, ¿cuántos semestres reales te faltan para graduarte de Física? Alrededor de seis o siete semestres. Si te pasas a Biología, arrancas de nuevo con 10 semestres menos lo que homologues: las cátedras, algunas básicas —sé que tú quieres volver a ver las matemáticas para repasar, pero igual no tendrías que verlo todo, o podrías repasar o ver el último nivel de matemática que ven los biólogos—. Vale la pena hacer esa comparativa real en papel —que no puedo hacer yo solo, pero la podemos hacer juntos— para ver cuál es la diferencia real de semestres. Porque hoy te falta más de la mitad de Física, entonces el cambio no es "empezar de cero perdiendo media carrera"; la diferencia en tiempo no es tan gigante como parece (y comparado con hacer Física y luego Biología, pasarte ya es de hecho mucho más corto).',
      'Además, teniendo en cuenta todo lo que has avanzado en tu proceso con la psicóloga y con la psiquiatra, también puedes ver Biología como un nuevo comienzo con el pie derecho, aplicando ya las herramientas que has aprendido para intentar llevar un mejor orden con las materias —obvio nada se ordena solo por magia, pero ya tienes experiencia en la vida universitaria y años de bagaje académico encima, así que este inicio no sería tan duro como la primera vez—.',
      'Y lo último es simplemente verificar si ya exploraste las terceras vías —que creo que sí—, como quedarte en Física y orientar el trabajo de grado o un posgrado hacia Biología (que no sé por qué no la veo tan acorde a lo que buscas, pero igual vale contemplarla) o mirar el tema de la doble titulación en la U. Si te pasas a Biología, igual toda esa base fuerte en Física que ya tienes no se pierde: es una ventaja grande porque son ciencias relativamente cercanas. No te menciono estas opciones para que hagas una en vez de cambiarte, sino solo para que tengas la tranquilidad de que ya las miraste y sabes que no pesan más para ti que cambiarte ya o quedarte.',
    ],
  },
  {
    id: 'postura',
    indexLabel: 'Parte 5 de 5',
    kicker: 'Mi postura honesta',
    title: 'Lo que veo desde afuera (y mis propios sesgos)',
    paragraphs: [
      'Ya si me preguntas qué opino yo de frente, siendo muy honesto contigo: desde afuera —tanto desde afuera de ti como desde afuera de ambas carreras—, me inclino un poco más por verte en Biología.',
      'Primero, por lo que te decía desde el principio viéndolo con el panorama completo, o al menos desde lo que hemos visto en Bella: en Biología hay salidas de campo, es importante el dibujo, la interacción con la vida y sus distintas formas, también hay matemáticas y cálculos, es bastante variada... y todas esas cosas las veo en ti, son cosas que de por sí te gustan mucho. Física es muy afín a ti, muchísimo, pero en una cantidad de aspectos más limitada a mi parecer; Biología se siente como una combinación más amplia, una intersección muy interesante entre tus gustos académicos y tus gustos personales. Y además por cómo te he visto tratar el tema durante todo este tiempo: incluso antes de pensar en pasarte, ya te llamaba muchísimo la atención cuando te mostraban o veías lo que hacían.',
      'Pero también quiero ser honesto con mis propios sesgos: tal vez estoy sesgado porque te veo muy ilusionada hablando de esto. Por eso mismo intento tener presente lo que me parece más relevante —y que conecta directo con la primera pregunta de arriba—: asegurarte de que esté influyendo lo menos posible el sesgo de los problemas que viviste durante Física. Que no haya un sesgo inconsciente haciéndote pensar que al cambiarte de carrera muchos de esos problemas van a desaparecer. No van a desaparecer —tal vez disminuyan—, pero es clave que el cambio no se esté usando como un escape pensando que Física es el problema, porque muy seguramente en muchas de esas situaciones académicas el problema no fue Física, sino cosas externas.',
      'Por eso siento que esa pregunta del principio y esto se conectan al final: ¿te estás alejando de una cosa o acercándote a la otra? Los factores externos hoy están a tu favor decidas lo que decidas —tienes el traslado aprobado, el apoyo de tus papás y el mío—. Entonces la decisión termina juntando todos estos hechos objetivos con cómo te sientes tú en el fondo, abriendo la sinceridad contigo misma al máximo. Yo pienso que una vez tengas una respuesta decente a esa pregunta, ya tienes gran parte de la decisión resuelta. Y aquí estoy contigo para pensarla y acompañarte en lo que elijas.',
    ],
  },
];

export interface ReflectionQuestion {
  id: string;
  tag: string;
  text: string;
  hint: string;
}

export const REFLECTION_QUESTIONS: ReflectionQuestion[] = [
  {
    id: 'q1',
    tag: 'Brújula',
    text: '¿Sientes que te estás acercando a Biología o alejándote de Física?',
    hint: 'No hay respuesta buena ni mala: solo nota cuál de las dos frases se siente más verdad hoy.',
  },
  {
    id: 'q2',
    tag: 'Silencio externo',
    text: 'Si nadie —ni tu familia, ni tus amigos, ni el "qué dirán"— fuera a opinar nunca sobre esta decisión, ¿qué camino elegirías hoy?',
    hint: 'Quita por diez segundos todo el ruido de afuera y mira qué queda.',
  },
  {
    id: 'q3',
    tag: 'Física e identidad',
    text: 'Cuando piensas en soltar Física, ¿qué te duele más: dejar de estudiar Física como ciencia o soltar la idea de ti misma que construiste desde el colegio y P11?',
    hint: 'A veces defender un plan viejo se confunde con seguir queriéndolo.',
  },
  {
    id: 'q4',
    tag: 'Realidad de Biología',
    text: '¿Ya miraste la parte menos bonita de Biología (la burocracia, las materias pesadas, lo laboral), o todavía la estás viendo un poco desde el "tráiler"?',
    hint: 'Toda carrera tiene sus días densos; conviene conocer también la película completa.',
  },
  {
    id: 'q5',
    tag: 'Cotidianidad',
    text: 'Imagina un martes cualquiera a las 10 p.m., cansada y con parcial al otro día: ¿qué cuaderno prefieres tener abierto sobre el escritorio?',
    hint: 'El día a día suele ser más honesto que el día de la graduación.',
  },
  {
    id: 'q6',
    tag: 'Separar el ruido',
    text: 'De los momentos duros que viviste en Física, ¿cuánto fue culpa de la carrera y cuánto fue de cosas externas que pasaron mientras la estudiabas?',
    hint: 'Cambiar de carrera puede dar aire, pero no borra automáticamente lo externo.',
  },
  {
    id: 'q7',
    tag: 'Física sin peso',
    text: 'Si pudieras empezar Física hoy otra vez, pero sin el desgaste ni los problemas externos que te tocaron vivir, ¿te quedarías?',
    hint: 'Una forma justa de medir cuánto amor real sigue habiendo por Física.',
  },
  {
    id: 'q8',
    tag: 'Universidad vs. gusto propio',
    text: '¿Cuál de las dos carreras quieres vivir formalmente en la U (con laboratorios, profes y título) y cuál te gustaría más bien mantener viva por tu cuenta, por puro gusto?',
    hint: 'Elegir una para la universidad no significa borrar la otra de tu vida.',
  },
  {
    id: 'q9',
    tag: 'Dos pregrados',
    text: 'Si te quedas en Física pensando "después hago Biología", ¿de verdad te ves haciendo dos pregrados en la UdeA, o es una forma de no sentir que renuncias a nada?',
    hint: 'A veces "hago las dos" alivia el miedo de elegir, aunque en tiempos reales cueste muchísimo.',
  },
  {
    id: 'q10',
    tag: 'Mirando atrás · Física',
    text: 'En cinco años, si te quedaste en Física, ¿qué te pesaría más: haberte quedado con la duda de Biología o saber que elegiste terminar lo que empezaste?',
    hint: 'Piensa en la Luna de dentro de cinco años mirando este momento.',
  },
  {
    id: 'q11',
    tag: 'Mirando atrás · Biología',
    text: 'Y al revés: en cinco años, si te pasaste a Biología y un día ves a alguien graduándose de Física o resolviendo algo que te apasionaba, ¿qué sentirías? ¿Paz con tu camino o nostalgia de haberla soltado?',
    hint: 'Pon las dos versiones de tu futuro frente a frente con la misma honestidad.',
  },
];

export type AxisKey = 'bioPull' | 'physicsPull' | 'physicsFatigue' | 'externalWeight';

export interface ThermometerAxis {
  key: AxisKey;
  label: string;
  shortDesc: string;
  color: string;
  softBg: string;
}

export const THERMOMETER_AXES: ThermometerAxis[] = [
  {
    key: 'bioPull',
    label: 'Atracción hacia Biología',
    shortDesc: 'Qué tanto te hala Biología por sí misma.',
    color: '#52e0b7',
    softBg: 'rgba(82, 224, 183, 0.14)',
  },
  {
    key: 'physicsPull',
    label: 'Vínculo genuino con Física',
    shortDesc: 'Qué tanto sigue viva tu curiosidad y gusto por Física.',
    color: '#6aa9ff',
    softBg: 'rgba(106, 169, 255, 0.14)',
  },
  {
    key: 'physicsFatigue',
    label: 'Desgaste de esta etapa',
    shortDesc: 'Cansancio acumulado por conflictos, desorden o momentos duros.',
    color: '#d9b872',
    softBg: 'rgba(217, 184, 114, 0.14)',
  },
  {
    key: 'externalWeight',
    label: 'Ruido externo e identidad',
    shortDesc: 'Peso del qué dirán, el plan viejo o el miedo a renunciar.',
    color: '#9fb0c7',
    softBg: 'rgba(159, 176, 199, 0.14)',
  },
];

export interface ThermometerItem {
  id: string;
  axis: AxisKey;
  statement: string;
}

// Interleaved order so it feels natural and balanced, never leading
export const THERMOMETER_ITEMS: ThermometerItem[] = [
  {
    id: 't1',
    axis: 'bioPull',
    statement: 'Incluso antes de pensar en el traslado, lo que hacen en Biología ya me llamaba la atención.',
  },
  {
    id: 't2',
    axis: 'physicsPull',
    statement: 'Todavía hay temas o preguntas de Física que me prenden la curiosidad de verdad.',
  },
  {
    id: 't3',
    axis: 'physicsFatigue',
    statement: 'A veces siento que cambiarme me ayudaría a dejar atrás el desgaste y los conflictos de esta etapa.',
  },
  {
    id: 't4',
    axis: 'externalWeight',
    statement: 'Me pesa mucho imaginar qué van a comentar o pensar en mi familia si me cambio.',
  },
  {
    id: 't5',
    axis: 'physicsPull',
    statement: 'Si pudiera quitar los problemas externos y el desorden de materias, Física me seguiría gustando.',
  },
  {
    id: 't6',
    axis: 'bioPull',
    statement: 'Siento que en Biología se juntan más partes de quién soy y de lo que disfruto.',
  },
  {
    id: 't7',
    axis: 'externalWeight',
    statement: 'Soltar Física se siente un poco como contradecir lo que siempre dije que iba a ser.',
  },
  {
    id: 't8',
    axis: 'physicsFatigue',
    statement: 'Me agota sentir las materias en desorden y que todavía falte tanto tramo en Física.',
  },
  {
    id: 't9',
    axis: 'bioPull',
    statement: 'Cuando me imagino estudiando Biología, siento ilusión genuina más allá de salir de otra carrera.',
  },
  {
    id: 't10',
    axis: 'physicsPull',
    statement: 'Me da nostalgia real imaginarme cerrando la puerta de formarme como física.',
  },
  {
    id: 't11',
    axis: 'physicsFatigue',
    statement: 'Me cuesta separar si ya no me gusta Física o si solo estoy cansada de todo lo que viví mientras la estudiaba.',
  },
  {
    id: 't12',
    axis: 'externalWeight',
    statement: 'Decir "termino Física y luego hago Biología" me calma porque así no siento que pierdo ninguna.',
  },
];

export type DecisionChoice = 'physics' | 'biology';

export interface EmotionOption {
  id: string;
  label: string;
  tone: 'open' | 'heavy' | 'mixed';
}

export const EMOTION_OPTIONS: EmotionOption[] = [
  { id: 'alivio', label: 'Alivio', tone: 'open' },
  { id: 'paz', label: 'Paz', tone: 'open' },
  { id: 'emocion', label: 'Emoción', tone: 'open' },
  { id: 'ligereza', label: 'Ligereza', tone: 'open' },
  { id: 'vertigo', label: 'Vértigo / miedo', tone: 'mixed' },
  { id: 'tristeza', label: 'Tristeza', tone: 'heavy' },
  { id: 'pesadez', label: 'Pesadez', tone: 'heavy' },
  { id: 'devolverme', label: 'Ganas de devolverme', tone: 'heavy' },
];

export const CLOSING_NOTE = {
  dedication: 'Luna Rodríguez (Abocito)',
  message:
    'Cuando quieras o lo necesites, nos podemos sentar a terminar de definir lo que sientas que hace falta. Para lo que necesites y cuando lo necesites, ahí estaré.',
};
