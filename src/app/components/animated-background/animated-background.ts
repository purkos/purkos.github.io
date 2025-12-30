import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-animated-background',
  imports: [],
  templateUrl: './animated-background.html',
  styleUrl: './animated-background.scss',
})
export class AnimatedBackgroundComponent implements OnInit, OnDestroy {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private animationId!: number;
  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;
  private floatingSpheres: THREE.Mesh[] = [];
  private scrollY = 0;
  private isScrolling = false;
  private scrollTimeout: any;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.initThree();
    this.createParticles();
    this.createGeometricShapes();
    this.createFloatingSpheres();
    this.animate();
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    window.removeEventListener('scroll', this.onScroll);
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }

  private initThree(): void {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 50;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const container = this.el.nativeElement.querySelector('.animated-background');
    if (container) {
      container.appendChild(this.renderer.domElement);
      console.log('Canvas appended to container');
    } else {
      console.error('Container not found');
    }
  }

  private createParticles(): void {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 6000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 350;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.8,
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);

    const gridHelper = new THREE.GridHelper(350, 70, 0xffffff, 0xffffff);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.08;
    gridHelper.position.y = -35;
    this.scene.add(gridHelper);

    const gridHelper2 = new THREE.GridHelper(350, 70, 0xffffff, 0xffffff);
    gridHelper2.material.transparent = true;
    gridHelper2.material.opacity = 0.06;
    gridHelper2.rotation.z = Math.PI / 2;
    gridHelper2.position.x = -35;
    this.scene.add(gridHelper2);
  }

  private createGeometricShapes(): void {
    const torusGeometry = new THREE.TorusGeometry(10, 1, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });

    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(50, 20, -50);
    this.scene.add(torus);

    const octahedronGeometry = new THREE.OctahedronGeometry(15, 0);
    const octahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });

    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(-60, -20, -60);
    this.scene.add(octahedron);

    const icosahedronGeometry = new THREE.IcosahedronGeometry(12, 0);
    const icosahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });

    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.set(-30, 40, -70);
    this.scene.add(icosahedron);

    const tetrahedronGeometry = new THREE.TetrahedronGeometry(8, 0);
    const tetrahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });

    const tetrahedron = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial);
    tetrahedron.position.set(70, -30, -40);
    this.scene.add(tetrahedron);
  }

  private createFloatingSpheres(): void {
    // Create I-beams (steel construction beams)
    for (let i = 0; i < 3; i++) {
      const beamLength = Math.random() * 15 + 10;
      const beamWidth = 2;
      const flangeThickness = 0.3;
      const webThickness = 0.2;

      // Create I-beam using box geometries
      const group = new THREE.Group();

      // Top flange
      const topFlange = new THREE.BoxGeometry(beamWidth, flangeThickness, beamLength);
      const topFlangeMesh = new THREE.Mesh(
        topFlange,
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.25,
        })
      );
      topFlangeMesh.position.y = beamWidth / 2;
      group.add(topFlangeMesh);

      // Bottom flange
      const bottomFlange = new THREE.BoxGeometry(beamWidth, flangeThickness, beamLength);
      const bottomFlangeMesh = new THREE.Mesh(
        bottomFlange,
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.25,
        })
      );
      bottomFlangeMesh.position.y = -beamWidth / 2;
      group.add(bottomFlangeMesh);

      // Web (middle vertical part)
      const web = new THREE.BoxGeometry(webThickness, beamWidth, beamLength);
      const webMesh = new THREE.Mesh(
        web,
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.25,
        })
      );
      group.add(webMesh);

      group.position.set(
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60 - 20
      );

      (group as any).velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.2
      );

      this.floatingSpheres.push(group as any);
      this.scene.add(group);
    }

    // Create steel trusses (triangular support structures)
    for (let i = 0; i < 3; i++) {
      const trussGroup = new THREE.Group();
      const trussLength = Math.random() * 12 + 8;
      const trussHeight = 4;
      const barThickness = 0.2;

      // Create truss bars
      const topBar = new THREE.BoxGeometry(barThickness, barThickness, trussLength);
      const topBarMesh = new THREE.Mesh(
        topBar,
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.22,
        })
      );
      topBarMesh.position.y = trussHeight / 2;
      trussGroup.add(topBarMesh);

      const bottomBar = new THREE.BoxGeometry(barThickness, barThickness, trussLength);
      const bottomBarMesh = new THREE.Mesh(
        bottomBar,
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.22,
        })
      );
      bottomBarMesh.position.y = -trussHeight / 2;
      trussGroup.add(bottomBarMesh);

      // Diagonal supports
      for (let j = 0; j < 3; j++) {
        const diagonalLength = Math.sqrt(trussHeight * trussHeight + (trussLength / 3) * (trussLength / 3));
        const diagonal = new THREE.BoxGeometry(barThickness, barThickness, diagonalLength);
        const diagonalMesh = new THREE.Mesh(
          diagonal,
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.22,
          })
        );
        diagonalMesh.position.z = -trussLength / 2 + (j * trussLength) / 3;
        diagonalMesh.rotation.x = j % 2 === 0 ? Math.atan(trussHeight / (trussLength / 3)) : -Math.atan(trussHeight / (trussLength / 3));
        trussGroup.add(diagonalMesh);
      }

      trussGroup.position.set(
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60 - 20
      );

      (trussGroup as any).velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.35,
        (Math.random() - 0.5) * 0.35,
        (Math.random() - 0.5) * 0.25
      );

      this.floatingSpheres.push(trussGroup as any);
      this.scene.add(trussGroup);
    }

    // Create steel frames (rectangular frames)
    for (let i = 0; i < 2; i++) {
      const frameGroup = new THREE.Group();
      const frameWidth = Math.random() * 8 + 6;
      const frameHeight = Math.random() * 8 + 6;
      const barThickness = 0.25;

      // Four edges of the frame
      const edges = [
        { w: barThickness, h: barThickness, d: frameWidth, x: 0, y: frameHeight / 2, z: 0, rx: 0, ry: Math.PI / 2, rz: 0 },
        { w: barThickness, h: barThickness, d: frameWidth, x: 0, y: -frameHeight / 2, z: 0, rx: 0, ry: Math.PI / 2, rz: 0 },
        { w: barThickness, h: barThickness, d: frameHeight, x: frameWidth / 2, y: 0, z: 0, rx: 0, ry: 0, rz: Math.PI / 2 },
        { w: barThickness, h: barThickness, d: frameHeight, x: -frameWidth / 2, y: 0, z: 0, rx: 0, ry: 0, rz: Math.PI / 2 },
      ];

      edges.forEach((edge) => {
        const edgeGeom = new THREE.BoxGeometry(edge.w, edge.h, edge.d);
        const edgeMesh = new THREE.Mesh(
          edgeGeom,
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.23,
          })
        );
        edgeMesh.position.set(edge.x, edge.y, edge.z);
        edgeMesh.rotation.set(edge.rx, edge.ry, edge.rz);
        frameGroup.add(edgeMesh);
      });

      frameGroup.position.set(
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60 - 20
      );

      (frameGroup as any).velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.2
      );

      this.floatingSpheres.push(frameGroup as any);
      this.scene.add(frameGroup);
    }
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    // Only animate when scrolling
    if (this.isScrolling) {
      this.targetX = this.mouseX * 0.001;
      this.targetY = this.mouseY * 0.001;

      this.camera.position.x += (this.targetX - this.camera.position.x) * 0.05;
      this.camera.position.y += (-this.targetY - this.camera.position.y) * 0.05;
      this.camera.lookAt(this.scene.position);

      // Rotate particles based on scroll
      this.particles.rotation.y = this.scrollY * 0.0005;
      this.particles.rotation.x += 0.0005;

      const positions = this.particles.geometry.attributes['position'];
      const time = Date.now() * 0.001;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        positions.setY(i, y + Math.sin(time + x * 0.01) * 0.05);
      }
      positions.needsUpdate = true;

      // Rotate geometric shapes based on scroll
      const scrollRotation = this.scrollY * 0.001;
      this.scene.children.forEach((child: THREE.Object3D) => {
        if ((child instanceof THREE.Mesh || child instanceof THREE.GridHelper) && !this.floatingSpheres.includes(child as any)) {
          child.rotation.x = scrollRotation + time * 0.2;
          child.rotation.y = scrollRotation + time * 0.15;
        }
      });

      this.floatingSpheres.forEach((sphere) => {
        const velocity = (sphere as any).velocity as THREE.Vector3;

        sphere.position.add(velocity);

        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.015;

        if (Math.abs(sphere.position.x) > 100) {
          velocity.x *= -1;
        }
        if (Math.abs(sphere.position.y) > 50) {
          velocity.y *= -1;
        }
        if (Math.abs(sphere.position.z) > 50) {
          velocity.z *= -1;
        }

        // Update opacity for all children materials (for Groups)
        if (sphere instanceof THREE.Group) {
          sphere.children.forEach((child) => {
            if (child instanceof THREE.Mesh && child.material) {
              const material = child.material as THREE.MeshBasicMaterial;
              material.opacity = 0.2 + Math.sin(time * 0.5 + sphere.position.x) * 0.05;
            }
          });
        } else if (sphere.material) {
          // For single meshes
          const material = sphere.material as THREE.MeshBasicMaterial;
          material.opacity = 0.2 + Math.sin(time * 0.5 + sphere.position.x) * 0.05;
        }
      });
    }

    this.renderer.render(this.scene, this.camera);
  }

  private onMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX - window.innerWidth / 2;
    this.mouseY = event.clientY - window.innerHeight / 2;
  }

  private onScroll = (): void => {
    this.scrollY = window.scrollY;
    this.isScrolling = true;

    // Clear previous timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // Set timeout to detect when scrolling stops
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 150);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
