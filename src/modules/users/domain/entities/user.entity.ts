/**
 * Representa un usuario del sistema con su información personal, de seguridad y autenticación.
 */
export class UserEntity {
  private constructor(
    private readonly props: {
      id: string;
      email: string;
      name: string;
      recoveryEmail: string;
      isEmailVerified: boolean;
      securityQuestion: string;
      securityAnswer: string;
      recoveryCode: string;
      twoFactorEnabled: boolean;
      twoFactorSecret: string | null;
      rememberCard: boolean;
      password: string;
    }
  ) { }

  /**
  * Crea una nueva instancia desde un objeto plano.
  * @param props Objeto con las propiedades del usuario.
  */
  /**
   * Crea una nueva instancia desde un objeto plano.
   * @param props Objeto con las propiedades del usuario.
   */
  static fromPrimitives(props: {
    id: string;
    email: string;
    name: string;
    recoveryEmail: string;
    isEmailVerified: boolean;
    securityQuestion: string;
    securityAnswer: string;
    recoveryCode: string;
    twoFactorEnabled: boolean;
    twoFactorSecret: string | null;
    rememberCard: boolean;
    password: string;
  }): UserEntity {
    return new UserEntity(props);
  }


  /**
   * Convierte la entidad a un objeto plano para persistencia.
   */
  toPrimitives(): {
    id: string;
    email: string;
    name: string;
    recoveryEmail: string;
    isEmailVerified: boolean;
    securityQuestion: string;
    securityAnswer: string;
    recoveryCode: string;
    twoFactorEnabled: boolean;
    twoFactorSecret: string | null;
    rememberCard: boolean;
    password: string;
  } {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      recoveryEmail: this.recoveryEmail,
      isEmailVerified: this.isEmailVerified,
      securityQuestion: this.securityQuestion,
      securityAnswer: this.securityAnswer,
      recoveryCode: this.recoveryCode,
      twoFactorEnabled: this.twoFactorEnabled,
      twoFactorSecret: this.twoFactorSecret,
      rememberCard: this.rememberCard,
      password: this.password,
    };
  }

  /**
   * Crea una nueva instancia de UserEntity.
   * @param props Propiedades requeridas para la creación del usuario.
   */
  static create(props: {
    id: string;
    email: string;
    name: string;
    password: string;
    recoveryCode: string;
  }): UserEntity {
    return new UserEntity({
      ...props,
      recoveryEmail: '',
      securityQuestion: '',
      securityAnswer: '',
      isEmailVerified: false,
      twoFactorEnabled: false,
      twoFactorSecret: null,
      rememberCard: false,
    });
  }

  /** ID del usuario */
  get id(): string {
    return this.props.id;
  }

  /** Correo del usuario */
  get email(): string {
    return this.props.email;
  }

  /** Nombre del usuario */
  get name(): string {
    return this.props.name;
  }

  /** Email de recuperación */
  get recoveryEmail(): string {
    return this.props.recoveryEmail;
  }

  /** ¿Correo verificado? */
  get isEmailVerified(): boolean {
    return this.props.isEmailVerified;
  }

  /** Pregunta de seguridad */
  get securityQuestion(): string {
    return this.props.securityQuestion;
  }

  /** Respuesta de seguridad */
  get securityAnswer(): string {
    return this.props.securityAnswer;
  }

  /** Código de recuperación */
  get recoveryCode(): string {
    return this.props.recoveryCode;
  }

  /** ¿2FA activado? */
  get twoFactorEnabled(): boolean {
    return this.props.twoFactorEnabled;
  }

  /** Clave secreta 2FA */
  get twoFactorSecret(): string | null {
    return this.props.twoFactorSecret;
  }

  /** ¿Recordar tarjeta? */
  get rememberCard(): boolean {
    return this.props.rememberCard;
  }

  /** Hash de contraseña */
  get password(): string {
    return this.props.password;
  }

  /**
   * Marca el correo como verificado.
   */
  verifyEmail(): UserEntity {
    return new UserEntity({
      ...this.props,
      isEmailVerified: true,
    });
  }

  /**
   * Activa 2FA con el secret proporcionado.
   * @param secret Clave secreta para 2FA.
   */
  enableTwoFactor(secret: string): UserEntity {
    if (!secret) throw new Error('Two-factor secret is required');
    return new UserEntity({
      ...this.props,
      twoFactorEnabled: true,
      twoFactorSecret: secret,
    });
  }

  /**
   * Desactiva 2FA.
   */
  disableTwoFactor(): UserEntity {
    return new UserEntity({
      ...this.props,
      twoFactorEnabled: false,
      twoFactorSecret: null,
    });
  }

  /**
   * Verifica si la respuesta de seguridad es válida.
   * @param answer Respuesta ingresada.
   */
  isSecurityAnswerValid(answer: string): boolean {
    return this.props.securityAnswer === answer;
  }
}
