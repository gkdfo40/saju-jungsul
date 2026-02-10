export default function HomePage() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="text-center space-y-4">
        <h1
          className="font-secondary"
          style={{
            fontSize: "var(--display-1-size)",
            lineHeight: "var(--display-1-line-height)",
            fontWeight: "var(--display-1-weight)",
          }}
        >
          사주정설
        </h1>
        <p className="text-muted-foreground">타고난 사주 팔자를 분석하여 운명의 흐름을 읽어드립니다.</p>
      </div>
    </div>
  );
}
