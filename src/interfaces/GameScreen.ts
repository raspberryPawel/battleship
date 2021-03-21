export type ScreenType = GameScreen | null;

export abstract class GameScreen {
  public nextScreen: ScreenType = null;
  public abstract prepareScreen(): void;
  public abstract prepareScreenEvents(): void;
  public abstract unregisterScreenEvents(): void;

  public constructor(nextScreen: ScreenType) {
    this.nextScreen = nextScreen;
  }
}
