import { startStimulusApp } from '@symfony/stimulus-bridge';
import { Turbo } from "@hotwired/turbo";

export const app = startStimulusApp(require.context(
    '@symfony/stimulus-bridge/lazy-controller-loader!./controllers',
    true,
    /\.[jt]sx?$/
));


