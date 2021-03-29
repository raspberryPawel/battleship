export abstract class GameScreen {
  public nextScreen: GameScreen = null;
  public abstract prepareScreen(): void;
  public abstract prepareScreenEvents(): void;
  public abstract unregisterScreenEvents(): void;

  public constructor(nextScreen: GameScreen) {
    this.nextScreen = nextScreen;
  }
}
